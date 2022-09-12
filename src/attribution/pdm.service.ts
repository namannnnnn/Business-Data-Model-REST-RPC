/* eslint-disable */

import { Injectable, Inject } from "@nestjs/common";
import {
  Repository,
  QueryRunner,
  Table,
  DataSource,
  In,
  getManager,
} from "typeorm";
import {
  dateVldn,
  boolVldn,
  rangeVldn,
  singleSelectVldn,
  textVldn,
  numericVldn,
  timeVldn,
  multipleSelectionVldn,
  dropDownVldn,
  urlVldn,
} from "src/dtos/validation.dto";
import { CategoryAssignment } from "src/entities/categoryAssignment.entity";
import { Category } from "../entities/category.entity";
import { CategoryGroupAssignment } from "src/entities/categoryGroupAssignment.entity";
import {
  categoryMapReqDto,
  categoryMapGroupReqDto,
  idDto,
} from "../dtos/category.dto";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { v4 as uuidv4 } from "uuid";
import { ReferenceAttributes } from "../entities/referenceAttribute.entity";
import { ValidationService } from "./validation.service";
import { PdmTables } from "src/entities/pdmTables.entity";
// import { Rule } from '../iterfaces/rules.interface'
// import { AttributeGroup } from 'src/Entities/attributeGroup.entity'
import { ReferenceMaster } from "src/entities/master.entity";
import { refAttrByIdDto, refAttrDto } from "src/dtos/referenceAttribute.dto";
import {
  attrDto,
  attrByIdDto,
  attrByIdResDto,
  attrGroupById,
  attrGroupReqDto,
  attrGroupResDto,
  assignAttr,
} from "../dtos/attribute.dto";
import { Attribute, AttributeGroup } from "../entities/attribute.entity";
import { AttributeService } from "./attribution.service";

@Injectable()
export class PdmService {
  constructor(
    @Inject(ValidationService)
    private readonly validationService: ValidationService,

    @Inject(AttributeService)
    private readonly attributeService: AttributeService,

    @Inject("ATTRIBUTE_REPOSITORY")
    private attributeRepository: Repository<Attribute>,

    @Inject("ATTRIBUTEGROUP_REPOSITORY")
    private attributeGroupRepository: Repository<AttributeGroup>,

    @Inject("ATTRIBUTE_REFERENCE_REPOSITORY")
    private attributeReferenceRepository: Repository<ReferenceAttributes>,

    @Inject("CATEGORY_REPOSITORY")
    private categoryRepository: Repository<Category>,

    @Inject("CATEGORY_ASSIGNMENT_REPOSITORY")
    private categoryAssignmentRepository: Repository<CategoryAssignment>,

    @Inject("CATEGORY_GROUP_ASSIGNMENT_REPOSITORY")
    private categoryGroupAssignmentRepository: Repository<CategoryGroupAssignment>,

    @Inject("MASTER_REFERENCE_REPOSITORY")
    private masterReferenceRepository: Repository<ReferenceMaster>,

    @InjectDataSource("PDM")
    private pdmDataSource: DataSource
  ) {}

  async createColumns(categoryId: number): Promise<any> {
    let columnsPdm = [
      {
        name: "pdm_id",
        type: "uuid",
        isPrimary: true,
        isGenerated: true,
        comment: undefined,
      },
    ];

    const atts = await this.categoryRepository.find({
      relations: {
        categoryAssignments: true,
      },
      where: {
        id: categoryId,
      },
    });

    let allattributes = atts[0].categoryAssignments;

    for (let i = 0; i < allattributes.length; i++) {
      let attribut = await this.attributeRepository.find({
        where: { id: allattributes[i].attributeId },
      });
      if (attribut[0].constraint === true) {
        let types = await this.createReferenceMasters(
          attribut[0].id,
          categoryId,
          attribut[0].attributeName
        );
        let reference = await this.masterReferenceRepository.find({
          select: { id: true, masterEntityName: true },
          where: { id: attribut[0].referenceMasterId },
        });
        let name = reference[0].masterEntityName.toLowerCase().trim();
        let columnTemp = {
          name: attribut[0].attributeName.toLowerCase().trim(),
          type: types,
          isPrimary: false,
          isGenerated: false,
          comment: name + "_" + reference[0].id,
        };
        columnsPdm.push(columnTemp);
      } else {
        let validation = await this.validationService.findValidation(
          attribut[0].id
        );
        let columnTemp = {
          name: attribut[0].attributeName.toLowerCase().trim(),
          type: validation[0].type.toString(),
          isPrimary: false,
          isGenerated: false,
          comment: undefined,
        };
        columnsPdm.push(columnTemp);
      }
    }
    const queryRunner = this.pdmDataSource.createQueryRunner();

    await queryRunner.connect();
    const tableSuffix = categoryId;
    const table = await queryRunner.manager
      .getRepository(PdmTables)
      .save({ categoryId: categoryId, tableName: "pdm_" + tableSuffix });

    await queryRunner.createTable(
      new Table({
        name: "pdm_" + tableSuffix,
        columns: columnsPdm,
      })
    );
    const tsblr = await queryRunner.getTable("PDM_" + tableSuffix);
    await queryRunner.release();
  }

  async createReferenceMasters(
    id: number,
    categoryId: number,
    name: string
  ): Promise<any> {
    const refAtts = await this.attributeService.fetchReferenceAttributes(id);
    const type = refAtts.attributes[0].attributeType;
    const refMasId = refAtts.attributes[0].referenceMasterId;
    const refMaster = await this.masterReferenceRepository.find({
      where: { id: refMasId },
    });
    const refMasterName = refMaster[0].masterEntityName;
    const refMasterSmall = refMasterName.toLowerCase();
    const queryRunner = this.pdmDataSource.createQueryRunner();

    await queryRunner.connect();
    let tableName = refMasterName.toLowerCase().trim();
    const tableSuffix = refMasId.replace(/-/g, "_");
    tableName = tableName + "_" + tableSuffix;

    // const table = await this.pdmTablesRepository.save({ id:uuidv4(), "categoryId": body.categoryId, "tableName":body.categoryId+'PDM'})
    const table = await queryRunner.manager
      .getRepository(PdmTables)
      .save({ categoryId: categoryId, tableName: tableName });

    let columnsPdm = [
      {
        name: "rm_id",
        type: "varchar",
        isPrimary: true,
        isGenerated: false,
      },
      {
        name: refMasterSmall,
        type: type,
        isPrimary: false,
        isGenerated: false,
      },
    ];

    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: columnsPdm,
      })
    );

    const tsblr = await queryRunner.getTable(tableName);

    console.log(tsblr);
    for (let i = 0; i < refAtts.attributes.length; i++) {
      let name = refAtts.attributes[i].attributeName;
      let id = uuidv4().replace(/-/g, "");
      await this.pdmDataSource.manager.query(
        `INSERT INTO ${tableName} (rm_id ,${refMasterSmall}) VALUES ('${id}' ,'${name}')`
      );
    }

    await queryRunner.release();

    return type;
  }

  async getPhysicalModel(categoryId: number): Promise<any> {
    let physicalDataModel = {
      tableName: "",
      attributeIds: [],
      attributeGroupIds: [],
    };

    let atts = [];
    let attgrs = [];
    const queryRunner = this.pdmDataSource.createQueryRunner();

    await queryRunner.connect();
    const tableName = await queryRunner.manager
      .getRepository(PdmTables)
      .find({ select: { tableName: true }, where: { categoryId: categoryId } });

    physicalDataModel.tableName = tableName[0].tableName;

    const attributeGroups = await this.categoryGroupAssignmentRepository.find({
      where: { categoryId: categoryId },
    });
    const attributes = await this.categoryAssignmentRepository.find({
      where: { categoryId: categoryId, grouping: false },
    });

    for (let i = 0; i < attributeGroups.length; i++) {
      physicalDataModel.attributeGroupIds.push(attributeGroups[i].attributeGroupId);
    }

    for (let i = 0; i < attributes.length; i++) {
      physicalDataModel.attributeIds.push(attributes[i].attributeId);
    }
    await queryRunner.release();

    return physicalDataModel;
  }
}
