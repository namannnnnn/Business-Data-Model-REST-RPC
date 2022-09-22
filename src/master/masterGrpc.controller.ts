/* eslint-disable */

import {
    Controller,
    Inject
  } from "@nestjs/common";
import {
    masterDto,
    masterByIdDto,
    masterReferenceDto,
    masterReferenceByIdDto,
  } from "src/dtos/master.dto";
import { MasterService } from './master.service'
import { GrpcMethod, GrpcStreamMethod, GrpcStreamCall, Client, ClientGrpc,Transport } from '@nestjs/microservices';
import { map } from 'rxjs';
import { join } from 'path';

@Controller()
export class MasterGrpcController  {

    @Inject(MasterService)
    private readonly service: MasterService;

    @GrpcMethod('MasterService', 'CreateMaster')
    private async createMaster(masterDto:masterDto): Promise<any> {
      const res = await this.service.createMasters(masterDto)
      return res.masters ;
    }

    @GrpcMethod('MasterService', 'GetMaster')
    private async getMaster(body : {id:number}): Promise<any> {
        const res = await this.service.getMasters(body.id);
        return res.masters;
    }

    @GrpcMethod('MasterService', 'GetAllMasters')
    private async getAllMaster(): Promise<any> {
        const res = await this.service.getAllMasters();
        return { masters: res };
      }

    @GrpcMethod('MasterService', 'UpdateMaster')  
    private async updateMaster( masterByIdDto: masterByIdDto): Promise<any> {
        const res = await this.service.updateMasters(masterByIdDto);
        return res.masters;
      }

    @GrpcMethod('MasterService', 'DeleteMaster')  
    private async deleteMaster(body:{ id: number }): Promise<any> {
        const res = await this.service.deleteMasters(body.id);
        return {};
      }  
}

@Controller()
export class ReferenceMasterGrpcController {

    @Inject(MasterService)
    private readonly service: MasterService;

    @GrpcMethod('ReferenceMasterService', 'CreateReferenceMaster')
    private async createReferenceMaster(masterReferenceDto: masterReferenceDto): Promise<any> {
        const res = await this.service.createReferenceMasters(masterReferenceDto);
        return res.masters;
      }
    
    @GrpcMethod('ReferenceMasterService', 'GetReferenceMaster')
    private async getReferenceMaster(body:{ id: number }): Promise<any> {
        const res = await this.service.getReferenceMasters(body.id);
        return res.masters;
      }

    @GrpcMethod('ReferenceMasterService', 'GetAllReferenceMasters')
    private async getAllReferenceMasters(): Promise<any> {
        const res = await this.service.getAllReferenceMasters();
        return { referenceMasters: res };
      }

    @GrpcMethod('ReferenceMasterService', 'UpdateReferenceMaster')
    private async updateReferenceMaster(masterReferenceByIdDto: masterReferenceByIdDto): Promise<any> {
        const res = await this.service.updateReferenceMasters(
          masterReferenceByIdDto
        );
        return res.masters;
      }

    @GrpcMethod('ReferenceMasterService', 'DeleteReferenceMaster')
    private async deleteReferenceMaster(body : {id: number}): Promise<any> {
        const res = await this.service.deleteReferenceMasters(body.id);
        return {};
      }

    @GrpcMethod('ReferenceMasterService', 'CreateReferenceMasterDataModel')
    private async createReferenceMasterDataModel ( body:{ id: number} ):Promise<any> {
      const res = await this.service.createReferenceMasterDataModels(body.id);
      return { referenceAttributes : res}
    }  


}