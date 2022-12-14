/* eslint-disable */

import { Injectable, Inject } from '@nestjs/common';
import {
  Repository,
  QueryRunner,
  Table,
  DataSource,
  In,
  getManager,
} from 'typeorm';
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
} from 'src/dtos/validation.dto';
import { CategoryAssignment } from 'src/Entities/categoryAssignment.entity';
import { Category } from '../Entities/category.entity';
import { CategoryGroupAssignment } from 'src/Entities/categoryGroupAssignment.entity';
import {
  categoryMapReqDto,
  categoryMapGroupReqDto,
} from '../dtos/category.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ReferenceAttributes } from '../Entities/referenceAttribute.entity';
import { ValidationService } from './validation.service';
// import { Rule } from '../iterfaces/rules.interface'
// import { AttributeGroup } from 'src/Entities/attributeGroup.entity'
import { ReferenceMaster } from 'src/Entities/master.entity';
import { refAttrByIdDto, refAttrDto } from 'src/dtos/referenceAttribute.dto';
import {
  attrDto,
  attrCatDto,
  attrGroupReqCatDto,
  attrByIdDto,
  attrByIdResDto,
  attrGroupById,
  attrGroupReqDto,
  attrGroupResDto,
  assignAttr,
  attributeDtoRpc,
} from '../dtos/attribute.dto';
import { Attribute, AttributeGroup } from '../Entities/attribute.entity';
import * as path from 'path';
import * as excelReader from 'xlsx';

@Injectable()
export class AttributeService {
  constructor(
    @Inject(ValidationService)
    private readonly validationService: ValidationService,

    @Inject('ATTRIBUTE_REPOSITORY')
    private attributeRepository: Repository<Attribute>,

    @Inject('ATTRIBUTEGROUP_REPOSITORY')
    private attributeGroupRepository: Repository<AttributeGroup>,

    @Inject('ATTRIBUTE_REFERENCE_REPOSITORY')
    private attributeReferenceRepository: Repository<ReferenceAttributes>,

    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,

    @Inject('CATEGORY_ASSIGNMENT_REPOSITORY')
    private categoryAssignmentRepository: Repository<CategoryAssignment>,

    @Inject('CATEGORY_GROUP_ASSIGNMENT_REPOSITORY')
    private categoryGroupAssignmentRepository: Repository<CategoryGroupAssignment>,

    @Inject('MASTER_REFERENCE_REPOSITORY')
    private masterReferenceRepository: Repository<ReferenceMaster>,


    @InjectDataSource('PDM')
    private pdmDataSource: DataSource,

  ) {}

  async createAttributesRpc(body: {
    attributeName: string;
    labelDescription: string;
    labelName: string;
    attributeType: string;
    constraint: boolean;
    masterId: number;
    referenceMasterId: number;
    attributeGroupId: number;
    textVldn: textVldn;
    numericVldn: numericVldn;
    dateVldn: dateVldn;
    timeVldn: timeVldn;
    rangeVldn: rangeVldn;
    singleSelectVldn: singleSelectVldn;
    multipleSelectionVldn: multipleSelectionVldn;
    dropDownVldn: dropDownVldn;
    urlVldn: urlVldn;
    status: boolean;
  }): Promise<any> {
    if (body.constraint == true) {
      body.referenceMasterId;
    } else {
      body.referenceMasterId = null;

    }
    let attributes = await this.attributeRepository.save({
      tenantId: 1,
      attributeName: body.attributeName,
      labelName: body.labelName,
      labelDescription: body.labelDescription,
      attributeType: body.attributeType,
      constraint: body.constraint,
      masterId: body.masterId,
      referenceMasterId: body.referenceMasterId,
      attributeGroupId: body.attributeGroupId,
      status: body.status,
    });

    await this.validationService.assignValidationRpc(
      body.attributeType,
      body.dateVldn,
      body.rangeVldn,
      body.singleSelectVldn,
      body.textVldn,
      body.numericVldn,
      body.timeVldn,
      body.multipleSelectionVldn,
      body.dropDownVldn,
      body.urlVldn,
      attributes.id,
    );

    return attributes;
  }

  async createAttributesByCategpriesRpc(body: {
    attributeName: string;
    labelDescription: string;
    labelName: string;
    attributeType: string;
    constraint: boolean;
    masterId: number;
    referenceMasterId: number;
    attributeGroupId: number;
    categoryId: number;
    textVldn: textVldn;
    numericVldn: numericVldn;
    dateVldn: dateVldn;
    timeVldn: timeVldn;
    rangeVldn: rangeVldn;
    singleSelectVldn: singleSelectVldn;
    multipleSelectionVldn: multipleSelectionVldn;
    dropDownVldn: dropDownVldn;
    urlVldn: urlVldn;
    status: boolean;
  }): Promise<any> {
    if ((body.constraint == false)) {
      body.referenceMasterId = null;
    }
    let attributes = await this.attributeRepository.save({
      tenantId: 1,
      attributeName: body.attributeName,
      labelName: body.labelName,
      labelDescription: body.labelDescription,
      attributeType: body.attributeType,
      constraint: body.constraint,
      masterId: body.masterId,
      referenceMasterId: body.referenceMasterId,
      attributeGroupId: body.attributeGroupId,
      categoryId: body.categoryId,
      status: body.status,
    });
    await this.categoryRepository.save({ id: body.categoryId });

    await this.validationService.assignValidationRpc(
      body.attributeType,
      body.dateVldn,
      body.rangeVldn,
      body.singleSelectVldn,
      body.textVldn,
      body.numericVldn,
      body.timeVldn,
      body.multipleSelectionVldn,
      body.dropDownVldn,
      body.urlVldn,
      attributes.id,
    );
    await this.categoryAssignmentRepository.save({
      attributeId: attributes.id,
      categoryId: body.categoryId,
      grouping: false,
    });

    return attributes;
  }

  async createAttributes(attrDto: attrDto): Promise<any> {
    console.log((attrDto.constraint == true));
    if (attrDto.constraint == true) {
      attrDto.referenceMasterId;
      console.log(attrDto)
    } else {
      attrDto.referenceMasterId = null;
    }
    console.log(attrDto)
    attrDto.tenantId = 1;
    let attributes = await this.attributeRepository.save({
      tenantId: 1,
      attributeName: attrDto.attributeName,
      labelName: attrDto.labelName,
      labelDescription: attrDto.labelDescription,
      attributeType: attrDto.attributeType,
      constraint: attrDto.constraint,
      masterId: attrDto.masterId,
      referenceMasterId: attrDto.referenceMasterId,
      attributeGroupId: attrDto.attributeGroupId,
      status: attrDto.status,
    });
    await this.validationService.assignValidation(
      attrDto.attributeType,
      attrDto.validation,
      attributes.id,
    );

    return { attributes };
  }

  async createAttributeByCategories(attrCatDto: attrCatDto): Promise<any> {
    if (attrCatDto.constraint == true) {
      attrCatDto.referenceMasterId;
    } else {
      attrCatDto.referenceMasterId = null;
    }
    attrCatDto.tenantId = 1;
    let attributes = await this.attributeRepository.save({
      tenantId: 1,
      attributeName: attrCatDto.attributeName,
      labelName: attrCatDto.labelName,
      labelDescription: attrCatDto.labelDescription,
      attributeType: attrCatDto.attributeType,
      constraint: attrCatDto.constraint,
      masterId: attrCatDto.masterId,
      referenceMasterId: attrCatDto.referenceMasterId,
      attributeGroupId: attrCatDto.attributeGroupId,
      status: attrCatDto.status,
    });
    await this.validationService.assignValidation(
      attrCatDto.attributeType,
      attrCatDto.validation,
      attributes.id,
    );
    await this.categoryRepository.save({ id: attrCatDto.categoryId });

    await this.categoryAssignmentRepository.save({
      attributeId: attributes[0].id,
      categoryId: attrCatDto.categoryId,
      grouping: false,
    });
    return { attributes };
  }

  async bulkUploadAttributes ( ):Promise<any> {
    let data = [];
    data = await this.sheetFileReader();
   

    let attributeNames = data.map((x) => x['Attribute Name']);
    let labelNames = data.map((x) => x['Label Name']);
    let labelDescription = data.map((x) => x['Label Description']);
    let attributeTypes = data.map((x) => x['Attribute Type']);
    let mandatoryAttributes = data.map((x) => x['Mandatory']);
    let constraint = data.map((x) => x['Constraint']);
    let referenceMasters = data.map((x) => x['Reference Master'])
    let status = data.map((x) => x['Status']);
    let tenantId = 1;
    let masterId = 1;
    for (let i = 0; i < attributeNames.length; i++) {


      if(constraint[i] == true) {

        let refMasterId  = await this.masterReferenceRepository.find({ select : { id : true }, where : { masterEntityName : referenceMasters[i] } })
        let att = await this.attributeRepository.save({
          tenantId: tenantId,
          attributeName: attributeNames[i],
          labelDescription: labelDescription[i],
          labelName: labelNames[i],
          attributeType: attributeTypes[i],
          constraint: constraint[i],
          masterId: masterId,
          referenceMasterId : refMasterId[0].id,
          status: status[i],
        });
        await this.validationService.assignValidation(attributeTypes[i],null,att.id)
      } else {

      let att = await this.attributeRepository.save({
        tenantId: tenantId,
        attributeName: attributeNames[i],
        labelDescription: labelDescription[i],
        labelName: labelNames[i],
        attributeType: attributeTypes[i],
        constraint: constraint[i],
        masterId: masterId,
        status: status[i],
      });
      await this.validationService.assignValidation(attributeTypes[i],null,att.id)

    }
    }
    return data;
  }

  async sheetFileReader():Promise<any> {
    const filePath = path.resolve(
      __dirname,
      '/Users/dhavalparmar/Desktop/PIM/bdm-rest-rpc/src/templates/attributes.xlsx',
    );
    const file = excelReader.readFile(filePath);
    let data = [];
    const sheets = file.SheetNames;
    for (let i = 0; i < sheets.length; i++) {
      const temp = excelReader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]],
      );
      temp.forEach((res) => {
        data.push(res);
      });
    }
    return data;
  }

  async sheetFileReaderGroup():Promise<any> {
    const filePath = path.resolve(
      __dirname,
      '/Users/dhavalparmar/Desktop/PIM/bdm-rest-rpc/src/templates/attributeGroup.xlsx',
    );
    const file = excelReader.readFile(filePath);
    let data = [];
    const sheets = file.SheetNames;
    for (let i = 0; i < sheets.length; i++) {
      const temp = excelReader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]],
      );
      temp.forEach((res) => {
        data.push(res);
      });
    }
    return data;
  }

  async getAttributesForCategory(id: number) {
    let ar = [];
    const at = await this.categoryAssignmentRepository.find({
      select: { attributeId: true },
      where: { categoryId: id },
    });
    for (let i = 0; i < at.length; i++) {
      ar.push(at[i].attributeId);
    }
    const ats = await this.attributeRepository.findBy({ id: In(ar) });

    let attributes = JSON.stringify(ats);
    attributes = JSON.parse(attributes);
    return attributes;
  }

  async getAttributes(id: number): Promise<any> {
    const attribute = await this.attributeRepository.find({
      where: { id: id },
    });
    let attributes = JSON.stringify(attribute[0]);
    attributes = JSON.parse(attributes);
    return { attributes };
  }

  async getAllAttributes(): Promise<any> {
    const attributes = await this.attributeRepository.find({});
    return attributes;
  }

  async updateAttributes(attrByIdDto: attrByIdDto): Promise<any> {
    const attributes = await this.attributeRepository.update(
      { id: attrByIdDto.id },
      { ...attrByIdDto },
    );
    const attribute = await this.getAttributes(attrByIdDto.id);
    let attribut = JSON.stringify(attribute.attributes);
    attribut = JSON.parse(attribut);
    return attribut;
  }

  async deleteAttributes(id: number): Promise<any> {
    // let attributeType = await this.getAttributes({ id: id })
    // const deleteValidation = await this.validationService.deleteValidation(attributeType.attributes.attributeType, body.id)
    const attribute = await this.attributeRepository.delete({ id: id });
    return {};
  }

  async createAttributeGroups(attrGroupReqDto: attrGroupReqDto): Promise<any> {
    attrGroupReqDto.tenantId = 1;
    const attributeGroups = await this.attributeGroupRepository.save({
      tenantId: attrGroupReqDto.tenantId,
      attributeGroupName: attrGroupReqDto.attributeGroupName,
      status: attrGroupReqDto.status,
    });
    if (attrGroupReqDto.attributes && attrGroupReqDto.attributes.length > 0) {
      //   const setAttributes = await body.ids.map(async(i) => { await this.attributeRepository.update({ id : i.id }, { attributeGroupId : attributeGroups.id }) })
      for (let i = 0; i < attrGroupReqDto.attributes.length; i++) {
        attrGroupReqDto.attributes[i].attributeGroupId = attributeGroups.id;
        await this.createAttributes(attrGroupReqDto.attributes[i]);
      }
    }

    const attributeGroup = await this.attributeGroupRepository.find({
      relations: {
        attributes: true,
      },
      where: {
        id: attributeGroups.id,
      },
    });
    let attrGroupRes = new attrGroupResDto();
    attrGroupRes.id = attributeGroups.id;
    attrGroupRes.tenantId = attributeGroups.tenantId;
    attrGroupRes.attributeGroupName = attributeGroups.attributeGroupName;
    attrGroupRes.status = attributeGroups.status;
    attrGroupRes.createdAt = attributeGroups.createdAt;
    attrGroupRes.updatedAt = attributeGroups.updatedAt;

    if (attrGroupReqDto.attributes && attrGroupReqDto.attributes.length > 0) {
      const arrayAtts: attrByIdResDto[] = [];
      for (let j = 0; j < attributeGroup[0].attributes.length; j++) {
        let at;
        at = JSON.stringify(attributeGroup[0].attributes[j]);
        at = JSON.parse(at);
        let a = new attrByIdResDto();
        a = at;
        arrayAtts.push(a);
      }
      attrGroupRes.attributes = arrayAtts;
    }

    let attGroup = JSON.stringify(attributeGroup[0]);
    attGroup = JSON.parse(attGroup);
    return attrGroupRes;
  }

  async createAttributeGroupByCategories(
    attrGroupReqCatDto: attrGroupReqCatDto,
  ): Promise<any> {
    attrGroupReqCatDto.tenantId = 1;
    const attributeGroups = await this.attributeGroupRepository.save({
      tenantId: attrGroupReqCatDto.tenantId,
      attributeGroupName: attrGroupReqCatDto.attributeGroupName,
      status: attrGroupReqCatDto.status,
    });
    if (
      attrGroupReqCatDto.attributes &&
      attrGroupReqCatDto.attributes.length > 0
    ) {
      //   const setAttributes = await body.ids.map(async(i) => { await this.attributeRepository.update({ id : i.id }, { attributeGroupId : attributeGroups.id }) })
      for (let i = 0; i < attrGroupReqCatDto.attributes.length; i++) {
        attrGroupReqCatDto.attributes[i].attributeGroupId = attributeGroups.id;
        await this.createAttributes(attrGroupReqCatDto.attributes[i]);
      }
    }

    const attributeGroup = await this.attributeGroupRepository.find({
      relations: {
        attributes: true,
      },
      where: {
        id: attributeGroups.id,
      },
    });
    let attrGroupRes = new attrGroupResDto();
    attrGroupRes.id = attributeGroups.id;
    attrGroupRes.tenantId = attributeGroups.tenantId;
    attrGroupRes.attributeGroupName = attributeGroups.attributeGroupName;
    attrGroupRes.status = attributeGroups.status;
    attrGroupRes.createdAt = attributeGroups.createdAt;
    attrGroupRes.updatedAt = attributeGroups.updatedAt;

    if (
      attrGroupReqCatDto.attributes &&
      attrGroupReqCatDto.attributes.length > 0
    ) {
      const arrayAtts: attrByIdResDto[] = [];
      for (let j = 0; j < attributeGroup[0].attributes.length; j++) {
        let at;
        at = JSON.stringify(attributeGroup[0].attributes[j]);
        at = JSON.parse(at);
        let a = new attrByIdResDto();
        a = at;
        arrayAtts.push(a);
      }
      attrGroupRes.attributes = arrayAtts;
    }

    let attGroup = JSON.stringify(attributeGroup[0]);
    attGroup = JSON.parse(attGroup);
    const attGroupAssign = new categoryMapGroupReqDto();
    attGroupAssign.id = attrGroupReqCatDto.categoryId;
    attGroupAssign.groupId = attributeGroups.id;
    await this.mapAttributeGroupsToCategories(attGroupAssign);
    return attrGroupRes;
  }

  async createAttributeGroupRpc(body: {
    attributeGroupName: string;
    status: boolean;
    tenantId: number;
    attributes: Array<attributeDtoRpc>;
  }): Promise<any> {
    body.tenantId = 1;
    const attributeGroups = await this.attributeGroupRepository.save({
      tenantId: body.tenantId,
      attributeGroupName: body.attributeGroupName,
      status: body.status,
    });
    if (body.attributes && body.attributes.length > 0) {
      // const setAttributes = await body.ids.map(async(i) => { await this.attributeRepository.update({ id : i.id }, { attributeGroupId : attributeGroups.id }) })
      for (let i = 0; i < body.attributes.length; i++) {
        // attrGroupReqCatDto.attributes[i].attributeGroupId = attributeGroups.id;
        body.attributes[i].attributeGroupId = attributeGroups.id;

        await this.createAttributesRpc(body.attributes[i]);
      }
    }

    const attributeGroup = await this.attributeGroupRepository.find({
      relations: {
        attributes: true,
      },
      where: {
        id: attributeGroups.id,
      },
    });
    let attrGroupRes = new attrGroupResDto();
    attrGroupRes.id = attributeGroups.id;
    attrGroupRes.tenantId = attributeGroups.tenantId;
    attrGroupRes.attributeGroupName = attributeGroups.attributeGroupName;
    attrGroupRes.status = attributeGroups.status;
    attrGroupRes.createdAt = attributeGroups.createdAt;
    attrGroupRes.updatedAt = attributeGroups.updatedAt;

    if (body.attributes && body.attributes.length > 0) {
      const arrayAtts: attrByIdResDto[] = [];
      for (let j = 0; j < attributeGroup[0].attributes.length; j++) {
        let at;
        at = JSON.stringify(attributeGroup[0].attributes[j]);
        at = JSON.parse(at);
        let a = new attrByIdResDto();
        a = at;
        arrayAtts.push(a);
      }
      attrGroupRes.attributes = arrayAtts;
    }

    return attrGroupRes;
  }

  async bulkUploadAttributeGroup ():Promise<any> {
    
      let data = [];
      data = await this.sheetFileReaderGroup();
     
  
      let attributeNames = data.map((x) => x['Attribute Name']);
      console.log(attributeNames)
      let labelNames = data.map((x) => x['Label Name']);
      let labelDescription = data.map((x) => x['Label Description']);
      let attributeTypes = data.map((x) => x['Attribute Type']);
      let mandatoryAttributes = data.map((x) => x['Mandatory']);
      let constraint = data.map((x) => x['Constraint']);
      let attributeGroups = data.map((x) => x['Attribute Group'])
      let referenceMasters = data.map((x) => x['Reference Master'])
      let status = data.map((x) => x['Status']);
      let tenantId = 1;
      let masterId = 1;
      for (let i = 0; i < attributeNames.length; i++) {
        
        let attGrExists = await this.attributeGroupRepository.find({ where : {  attributeGroupName: attributeGroups[i]  } })
        console.log(attGrExists)
        if(attGrExists != undefined && attGrExists.length != 0) { 

        if(constraint[i] == true) {
  
          let refMasterId  = await this.masterReferenceRepository.find({ select : { id : true }, where : { masterEntityName : referenceMasters[i] } })
          
          
          let att = await this.attributeRepository.save({
            tenantId: tenantId,
            attributeName: attributeNames[i],
            labelDescription: labelDescription[i],
            labelName: labelNames[i],
            attributeType: attributeTypes[i],
            constraint: constraint[i],
            masterId: masterId,
            attributeGroupId : attGrExists[0].id,
            referenceMasterId : refMasterId[0].id,
            status: status[i],
          });
          await this.validationService.assignValidation(attributeTypes[i],null,att.id)
        } else {
  
        let att = await this.attributeRepository.save({
          tenantId: tenantId,
          attributeName: attributeNames[i],
          labelDescription: labelDescription[i],
          labelName: labelNames[i],
          attributeType: attributeTypes[i],
          attributeGroupId : attGrExists[0].id,
          constraint: constraint[i],
          masterId: masterId,
          status: status[i],
        });
        await this.validationService.assignValidation(attributeTypes[i],null,att.id)
  
      }
        }
        else {
          let attrGroup = await this.attributeGroupRepository.save ( { "tenantId": tenantId, "attributeGroupName" : attributeGroups[i], "status" : true})
          console.log(attrGroup)

        if(constraint[i] == true) {
  
          let refMasterId  = await this.masterReferenceRepository.find({ select : { id : true }, where : { masterEntityName : referenceMasters[i] } })
          
          
          let att = await this.attributeRepository.save({
            tenantId: tenantId,
            attributeName: attributeNames[i],
            labelDescription: labelDescription[i],
            labelName: labelNames[i],
            attributeType: attributeTypes[i],
            constraint: constraint[i],
            masterId: masterId,
            attributeGroupId : attrGroup.id,
            referenceMasterId : refMasterId[0].id,
            status: status[i],
          });
          await this.validationService.assignValidation(attributeTypes[i],null,att.id)
        } else {
  
        let att = await this.attributeRepository.save({
          tenantId: tenantId,
          attributeName: attributeNames[i],
          labelDescription: labelDescription[i],
          labelName: labelNames[i],
          attributeType: attributeTypes[i],
          attributeGroupId : attrGroup.id,
          constraint: constraint[i],
          masterId: masterId,
          status: status[i],
        });
        await this.validationService.assignValidation(attributeTypes[i],null,att.id)
  
      }

        }

      }
      return data;
    
  }

  async createAttributeGroupByCategoriesRpc(body: {
    attributeGroupName: string;
    status: boolean;
    categoryId: number;
    tenantId: number;
    attributes: Array<attributeDtoRpc>;
  }): Promise<any> {
    body.tenantId = 1;
    const attributeGroups = await this.attributeGroupRepository.save({
      tenantId: body.tenantId,
      attributeGroupName: body.attributeGroupName,
      status: body.status,
    });
    if (body.attributes && body.attributes.length > 0) {
      // const setAttributes = await body.ids.map(async(i) => { await this.attributeRepository.update({ id : i.id }, { attributeGroupId : attributeGroups.id }) })
      for (let i = 0; i < body.attributes.length; i++) {
        // attrGroupReqCatDto.attributes[i].attributeGroupId = attributeGroups.id;
        body.attributes[i].attributeGroupId = attributeGroups.id;

        await this.createAttributesRpc(body.attributes[i]);
      }
    }

    const attributeGroup = await this.attributeGroupRepository.find({
      relations: {
        attributes: true,
      },
      where: {
        id: attributeGroups.id,
      },
    });
    let attrGroupRes = new attrGroupResDto();
    attrGroupRes.id = attributeGroups.id;
    attrGroupRes.tenantId = attributeGroups.tenantId;
    attrGroupRes.attributeGroupName = attributeGroups.attributeGroupName;
    attrGroupRes.status = attributeGroups.status;
    attrGroupRes.createdAt = attributeGroups.createdAt;
    attrGroupRes.updatedAt = attributeGroups.updatedAt;

    if (body.attributes && body.attributes.length > 0) {
      const arrayAtts: attrByIdResDto[] = [];
      for (let j = 0; j < attributeGroup[0].attributes.length; j++) {
        let at;
        at = JSON.stringify(attributeGroup[0].attributes[j]);
        at = JSON.parse(at);
        let a = new attrByIdResDto();
        a = at;
        arrayAtts.push(a);
      }
      attrGroupRes.attributes = arrayAtts;
    }

    let attGroup = JSON.stringify(attributeGroup[0]);
    attGroup = JSON.parse(attGroup);
    const attGroupAssign = new categoryMapGroupReqDto();
    attGroupAssign.id = body.categoryId;
    attGroupAssign.groupId = attributeGroups.id;
    const attributesss = await this.mapAttributeGroupsToCategories(
      attGroupAssign,
    );

    return attrGroupRes;
  }

  async assignAttributeToAttributeGroups(assignAttr: assignAttr): Promise<any> {
    // const setAttributes =  await assignAttr.attributes.map(async(i) => { await this.attributeRepository.update({ id : i }, { attributeGroupId : assignAttr.id }) })
    for (let i = 0; i < assignAttr.attributes.length; i++) {
      await this.attributeRepository.update(
        { id: assignAttr.attributes[i] },
        { attributeGroupId: assignAttr.id },
      );
    }
    const attgroup = await this.getAttributeGroups(assignAttr.id);

    return attgroup;
  }

  async removeAttributesFromAttributeGroups(
    assignAttr: assignAttr,
  ): Promise<any> {
    for (let i = 0; i < assignAttr.attributes.length; i++) {
      await this.attributeRepository.update(
        { id: assignAttr.attributes[i] },
        { attributeGroupId: null },
      );
    }

    const attgroup = await this.getAttributeGroups(assignAttr.id);

    return attgroup;
  }

  async getAttributeGroups(id: number): Promise<any> {
    const attributeGroup = await this.attributeGroupRepository.find({
      relations: {
        attributes: true,
      },
      where: {
        id: id,
      },
    });
    let attGroup = JSON.stringify(attributeGroup[0]);
    attGroup = JSON.parse(attGroup);

    return attGroup;
  }

  async getAttributeGroupByCategories(id: number): Promise<any> {
    const g = await this.categoryGroupAssignmentRepository.find({
      select: { attributeGroupId: true },
      where: {},
    });
    const attributeGroup = await this.attributeGroupRepository.find({
      relations: {
        attributes: true,
      },
      where: {
        id: g[0].attributeGroupId,
      },
    });
    let attGroup = JSON.stringify(attributeGroup[0]);
    attGroup = JSON.parse(attGroup);

    return attGroup;
  }

  async getAllAttributeGroups(): Promise<any> {
    const attGroup = await this.attributeGroupRepository.find({});
    let attg = JSON.stringify(attGroup);
    attg = JSON.parse(attg);
    return attg;
  }

  async updateAttributeGroups(attrGroupById: attrGroupById): Promise<any> {
    const attributeGroup = await this.attributeGroupRepository.update(
      { id: attrGroupById.id },
      { ...attrGroupById },
    );
    const attGroup = await this.attributeGroupRepository.find({
      where: { id: attrGroupById.id },
    });
    let attGroups = JSON.stringify(attGroup[0]);
    attGroups = JSON.parse(attGroups);
    return attGroups;
  }

  async deleteAttributeGroups(id: number): Promise<any> {
    const attributeGroup = await this.attributeGroupRepository.find({
      relations: {
        attributes: true,
      },
      where: {
        id: id,
      },
    });
    let attGroup = JSON.stringify(attributeGroup[0]);
    let attrGroup = JSON.parse(attGroup);
    let setAttGroupToNull = await attrGroup.attributes.map(async (i) => {
      await this.attributeRepository.update(
        { id: i.id },
        { attributeGroupId: null },
      );
    });

    const att = await this.attributeGroupRepository.delete({ id: id });

    return {};
  }

  async fetchReferenceAttributes(id: number): Promise<any> {
    const attribute = await this.attributeRepository.find({
      where: { id: id },
    });

    const referencedAttributes = await this.masterReferenceRepository.find({
      where: {
        id: attribute[0].referenceMasterId,
      }
    });

    const queryRunner = this.pdmDataSource.createQueryRunner();

    await queryRunner.connect();
    let tableName = (referencedAttributes[0].masterEntityName).toLowerCase().trim().replace(' ','_') + attribute[0].referenceMasterId
    const referenceData = await this.pdmDataSource.manager.query(`SELECT * FROM ${tableName} `);
    await queryRunner.release();


    return { referenceData };
  }

  async getReferenceAttributeForMaster(id:number): Promise<any> {
    const referencedAttributes = await this.masterReferenceRepository.find({
      relations: {
        referenceAttributes: true,
      },
      where: {
        id: id,
      },
    });

    let att = JSON.stringify(referencedAttributes[0]);
    let attr = JSON.parse(att);

    return attr.referenceAttributes ;
  }

  async createReferenceAttributes(refAttrDto: refAttrDto): Promise<any> {
    refAttrDto.tenantId = 1;
    let attributes = await this.attributeReferenceRepository.save(refAttrDto);
    return { attributes };
  }

  async getReferenceAttributes(id: number): Promise<any> {
    const attribute = await this.attributeReferenceRepository.find({
      where: { id: id },
    });
    let attributes = JSON.stringify(attribute[0]);
    attributes = JSON.parse(attributes);
    return { attributes };
  }

  async getAllReferenceAttributes(): Promise<any> {
    const refAts = await this.attributeReferenceRepository.find({});
    let attributes = JSON.stringify(refAts);
    attributes = JSON.parse(attributes);
    return attributes;
  }

  async getReferenceMastersAttributes(id: number): Promise<any> {
    const attrs = await this.masterReferenceRepository.find({
      relations: {
        referenceAttributes: true,
      },
      where: {
        id: id,
      },
    });
    let attribute = JSON.stringify(attrs[0]);
    const x = JSON.parse(attribute);

    return { referenceAttributes: x.referenceAttributes };
  }

  async updateReferenceAttributes(
    refAttrByIdDto: refAttrByIdDto,
  ): Promise<any> {
    const attributes = await this.attributeReferenceRepository.update(
      { id: refAttrByIdDto.id },
      { ...refAttrByIdDto },
    );
    const attribute = await this.getReferenceAttributes(refAttrByIdDto.id);
    let attribut = JSON.stringify(attribute.attributes);
    attribut = JSON.parse(attribut);
    return attribut;
  }

  async deleteReferenceAttributes(id: number): Promise<any> {
    const attribute = await this.attributeReferenceRepository.delete({
      id: id,
    });
    return {};
  }

  async mapAttributesToCategories(
    categoryMapReqDto: categoryMapReqDto,
  ): Promise<any> {
    await this.categoryRepository.save({ id: categoryMapReqDto.id });
    for (let i = 0; i < categoryMapReqDto.attIds.length; i++) {
      await this.categoryAssignmentRepository.save({
        categoryId: categoryMapReqDto.id,
        attributeId: categoryMapReqDto.attIds[i],
        grouping: false,
      });
    }

    const ats = await this.attributeRepository.findBy({
      id: In(categoryMapReqDto.attIds),
    });

    let attributes = JSON.stringify(ats);
    attributes = JSON.parse(attributes);
    return attributes;
  }

  async mapAttributeGroupsToCategories(
    categoryMapGroupReqDto: categoryMapGroupReqDto,
  ): Promise<any> {
    const catRes = await this.categoryRepository.save({
      id: categoryMapGroupReqDto.id,
    });
    console.log(catRes);
    const attGroCat = await this.categoryGroupAssignmentRepository.save({
      categoryId: categoryMapGroupReqDto.id,
      attributeGroupId: categoryMapGroupReqDto.groupId,
    });

    const attributeGroup = await this.attributeGroupRepository.find({
      select: {
        id: true,
      },
      relations: {
        attributes: true,
      },
      where: {
        id: categoryMapGroupReqDto.groupId,
      },
    });

    let atts = attributeGroup[0].attributes;
    let attArray = [];
    for (let i = 0; i < atts.length; i++) {
      await this.categoryAssignmentRepository.save({
        categoryId: categoryMapGroupReqDto.id,
        attributeId: atts[i].id,
        grouping: true,
      });
      attArray.push(atts[i].id);
    }
    const ats = await this.attributeRepository.findBy({ id: In(attArray) });
    let attributes = JSON.stringify(ats);
    attributes = JSON.parse(attributes);
    return attributes;
  }

  async timepass(): Promise<any> {
  
  }

  async filterData(data): Promise<any> {}
}
