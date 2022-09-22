/* eslint-disable */

import { Injectable, Inject } from '@nestjs/common';
import { Repository, DataSource, Table } from 'typeorm';
import { Master, ReferenceMaster } from '../Entities/master.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { databaseProviders } from 'src/database/database.provider';
import {
  masterDto,
  masterByIdDto,
  masterReferenceDto,
  masterReferenceByIdDto,
} from '../dtos/master.dto';

@Injectable()
export class MasterService {
  constructor(
    @Inject('MASTER_REPOSITORY')
    private masterRepository: Repository<Master>,

    @Inject('MASTER_REFERENCE_REPOSITORY')
    private masterReferenceRepository: Repository<ReferenceMaster>,

    @InjectDataSource('PDM')
    private pdmDataSource: DataSource,
  ) {}

  async createMasters(masterDto: masterDto): Promise<any> {
    masterDto.tenantId = 1;
    const masters = await this.masterRepository.save(masterDto);
    return { masters };
  }

  async getMasters(id: number): Promise<any> {
    const master = await this.masterRepository.find({ where: { id: id } });
    let masters = JSON.stringify(master[0]);
    masters = JSON.parse(masters);
    return { masters };
  }

  async getAllMasters(): Promise<any> {
    const masters = await this.masterRepository.find({});
    return masters;
  }

  async updateMasters(masterByIdDto: masterByIdDto): Promise<any> {
    const master = await this.masterRepository.update(
      { id: masterByIdDto.id },
      { ...masterByIdDto },
    );
    let masterPost = await this.masterRepository.find({
      where: { id: masterByIdDto.id },
    });
    let masters = JSON.stringify(masterPost[0]);
    masters = JSON.parse(masters);
    return { masters };
  }

  async deleteMasters(id: number): Promise<any> {
    const master = await this.masterRepository.delete({ id: id });
    return {};
  }

  async createReferenceMasters(
    masterReferenceDto: masterReferenceDto,
  ): Promise<any> {
    masterReferenceDto.tenantId = 1;
    const masters = await this.masterReferenceRepository.save(
      masterReferenceDto,
    );
    return { masters };
  }
  async getReferenceMasters(id: number): Promise<any> {
    const master = await this.masterReferenceRepository.find({
      where: { id: id },
    });
    let masters = JSON.stringify(master[0]);
    masters = JSON.parse(masters);
    return { masters };
  }

  async getAllReferenceMasters(): Promise<any> {
    const r = await this.masterReferenceRepository.find({});
    let referenceMasters = JSON.stringify(r);
    referenceMasters = JSON.parse(referenceMasters);
    return referenceMasters;
  }

  async updateReferenceMasters(
    masterReferenceByIdDto: masterReferenceByIdDto,
  ): Promise<any> {
    const master = await this.masterReferenceRepository.update(
      { id: masterReferenceByIdDto.id },
      { ...masterReferenceByIdDto },
    );
    let masterPost = await this.masterReferenceRepository.find({
      where: { id: masterReferenceByIdDto.id },
    });
    let masters = JSON.stringify(masterPost[0]);
    masters = JSON.parse(masters);
    return { masters };
  }

  async deleteReferenceMasters(id: number): Promise<any> {
    const master = await this.masterReferenceRepository.delete({ id: id });
    return {};
  }

  async createReferenceMasterDataModels(id:number): Promise<any> {

    const attrs = await this.masterReferenceRepository.find({
      relations: {
        referenceAttributes: true,
      },
      where: {
        id: id,
      },
    });

    console.log(attrs[0].referenceAttributes);
    let referenceAttributes = attrs[0].referenceAttributes
    let columnsPdm = [
      {
        name: 'rm_id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
      }]

      for(let i=0;i< referenceAttributes.length; i++){

        let tempColumn = {
          name : (referenceAttributes[i].attributeName).toLowerCase().trim().replace(' ','_'),
          type : (referenceAttributes[i].attributeType).toString(),
          isPrimary : false,
          isGenerated: false,

        }
        columnsPdm.push(tempColumn)



      }
      console.log(columnsPdm)
      let tableName = (attrs[0].masterEntityName).toLowerCase().trim().replace(' ','_') + id

      const queryRunner = this.pdmDataSource.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.createTable(
        new Table({
          name: tableName,
          columns: columnsPdm,
        }),
      );
      await queryRunner.release();

      return  referenceAttributes;


  }

}
