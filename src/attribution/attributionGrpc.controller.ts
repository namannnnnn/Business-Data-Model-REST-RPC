/* eslint-disable */

import { Controller, Inject,  } from '@nestjs/common';
import { AttributeService } from './attribution.service'
import { GrpcMethod, GrpcStreamMethod, GrpcStreamCall, Client, ClientGrpc,Transport } from '@nestjs/microservices';
import { Master, ReferenceMaster } from '../Entities/master.entity';
import { map } from 'rxjs';
import { join } from 'path';
import { refAttrByIdDto, refAttrDto } from "../dtos/referenceAttribute.dto";
  import {
    attrDto,
    attrByIdDto,
    attrCatDto,
    attrGroupReqDto,
    attrGroupReqCatDto,
    assignAttr,
    attrGroupById,
    attributeDtoRpc
  } from "../dtos/attribute.dto";
  import { ValidationService } from "./validation.service";
  import { PdmService } from "./pdm.service";
  import {
    categoryMapReqDto,
    categoryMapGroupReqDto,
    idDto,
  } from "../dtos/category.dto";
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
    dateVldnById,
    boolVldnById,
    rangeVldnById,
    singleSelectVldnById,
    textVldnById,
    numericVldnById,
    timeVldnById,
    multipleSelectionVldnById,
    dropDownVldnById,
    urlVldnById,
  } from "src/dtos/validation.dto";

@Controller()
export class ReferenceAttributeGrpcController {

    @Inject(AttributeService)
    private readonly service: AttributeService;


    @GrpcMethod('ReferenceAttributeService', 'CreateReferenceAttribute')
    private async createReferenceAttribute( refAttrDto: refAttrDto): Promise<any> {
        const res = await this.service.createReferenceAttributes(refAttrDto);
        return res.attributes;
      }

    @GrpcMethod('ReferenceAttributeService', 'GetReferenceAttribute')
    private async getReferenceAttribute(body : { id: number }): Promise<any> {
        const res = await this.service.getReferenceAttributes(body.id);
        return res.attributes;
      }

    @GrpcMethod('ReferenceAttributeService', 'GetAllReferenceAttribute')
    private async getAllReferenceAttribute(): Promise<any> {
        const res = await this.service.getAllReferenceAttributes();
        return { referenceAttributes: res };
      }

    @GrpcMethod('ReferenceAttributeService', 'GetReferenceAttributeForMaster')
      private async getReferenceAttributeForMaster(body: { id:number }):Promise<any> {

      }

    @GrpcMethod('ReferenceAttributeService', 'UpdateReferenceAttribute')
  private async updateReferenceAttribute( refAttrByIdDto: refAttrByIdDto ): Promise<any> {
    const res = await this.service.updateReferenceAttributes(refAttrByIdDto);
    return res;
  }

    @GrpcMethod('ReferenceAttributeService', 'DeleteReferenceAttribute')
    private async deleteReferenceAttribute(body: {id: number} ): Promise<any> {
        const res = await this.service.deleteReferenceAttributes(body.id);
        return res;
      }
}

@Controller()
export class AttributeGrpcController {

    @Inject(AttributeService)
    private readonly service: AttributeService;

    @Inject(ValidationService)
    private readonly validationService: ValidationService;

    @GrpcMethod('AttributeService', 'CreateAttribute')
    private async createAttribute(body : { attributeName: string, labelDescription: string, labelName: string, attributeType: string, constraint: boolean, masterId: number, referenceMasterId: number , attributeGroupId:number, textVldn : textVldn, numericVldn: numericVldn, dateVldn : dateVldn, timeVldn : timeVldn, rangeVldn : rangeVldn, singleSelectVldn: singleSelectVldn, multipleSelectionVldn : multipleSelectionVldn, dropDownVldn : dropDownVldn, urlVldn : urlVldn, status:boolean }): Promise<any> {
      const res = await this.service.createAttributesRpc(body);
      return res;
    }

    @GrpcMethod('AttributeService', 'CreateAttributeByCategory')
    private async createAttributeByCategory(body : { attributeName: string, labelDescription: string, labelName: string, attributeType: string, constraint: boolean, masterId: number, referenceMasterId: number , attributeGroupId:number, categoryId: number,textVldn : textVldn, numericVldn: numericVldn, dateVldn : dateVldn, timeVldn : timeVldn, rangeVldn : rangeVldn, singleSelectVldn: singleSelectVldn, multipleSelectionVldn : multipleSelectionVldn, dropDownVldn : dropDownVldn, urlVldn : urlVldn, status:boolean }): Promise<any> {
      const res = await this.service.createAttributesByCategpriesRpc(body);
      return res.attributes;
    }

    @GrpcMethod('AttributeService', 'GetAttribute')
    private async getAttribute(body:{ id: number}): Promise<any> {
      const res = await this.service.getAttributes(body.id);
      return res.attributes;
    }
    
    @GrpcMethod('AttributeService', 'FetchReferenceAttribute')
    private async fetchReferenceAttributes( body : {id: number}): Promise<any> {
      const res = await this.service.fetchReferenceAttributes(body.id);
      return res;
    }

    @GrpcMethod('AttributeService', 'GetAllAttribute')
    private async getAllAttribute(): Promise<any> {
      const res = await this.service.getAllAttributes();
      return { attributes: res };
    }

    @GrpcMethod('AttributeService', 'UpdateAttribute')
    private async updateAttribute( attrByIdDto: attrByIdDto ): Promise<any> {
      const res = await this.service.updateAttributes(attrByIdDto);
      return res;
    }    

    @GrpcMethod('AttributeService', 'DeleteAttribute')
    private async deleteAttribute(body:{ id: number }): Promise<any> {
      const res = await this.service.deleteAttributes(body.id);
      return res;
    }

    @GrpcMethod('AttributeService', 'FindValidation')
    private async findValidation(body:{ id: number }): Promise<any> {
      const res = await this.validationService.findValidation(body.id);
      console.log(res)
      return res;
    }

    @GrpcMethod('AttributeService', 'UpdateValidation') 
    private async updateValidation( body :  { attributeId : number,textVldnById : textVldnById, boolVldnById :boolVldnById,numericVldnById: numericVldnById, dateVldnById : dateVldnById, timeVldnById : timeVldnById, rangeVldnById : rangeVldnById, singleSelectVldnById: singleSelectVldnById, multipleSelectionVldnById : multipleSelectionVldnById, dropDownVldnById : dropDownVldnById, urlVldnById : urlVldnById }  ): Promise<any> {
      const res = await this.validationService.updateValidationRpc(body);
      console.log(res)
      return res;
    }

    @GrpcMethod('AttributeService', 'MapAttributesToCategory')
    private async mapAttributesToCategories(categoryMapReqDto: categoryMapReqDto): Promise<any> {
      const res = await this.service.mapAttributesToCategories(categoryMapReqDto);
      return {attributes :res};
    }

    @GrpcMethod('AttributeService', 'GetAttributesByCategory')
    private async getAttributesByCategory(body:{ id: number }): Promise<any> {
      const res = await this.service.getAttributesForCategory(body.id);
      return { attributes: res};
    }

}

@Controller()
export class AttributeGroupGrpcController {

    @Inject(AttributeService)
    private readonly service: AttributeService;

    @Inject(ValidationService)
    private readonly validationService: ValidationService;

    @GrpcMethod('AttributeGroupService', 'CreateAttributeGroup')
    private async createAttributeGroup( body:{ "attributeGroupName" : string, "status": boolean, "tenantId": number,"categoryId":number, attributes : Array<attributeDtoRpc> }): Promise<any> {
      const res = await this.service.createAttributeGroupRpc(body);
      return res;
    }

    @GrpcMethod('AttributeGroupService', 'GetAttributeGroup')
    private async getAttributeGroup(body :{ id: number }): Promise<any> {
      const res = await this.service.getAttributeGroups(body.id);
      return res;
    }

    
    @GrpcMethod('AttributeGroupService', 'CreateAttributeGroupByCategory')
    private async createAttributeGroupByCategory(body:{ "attributeGroupName" : string, "status": boolean, "tenantId": number,"categoryId":number, attributes : Array<attributeDtoRpc> }):Promise<any> {
     const res = await this.service.createAttributeGroupByCategoriesRpc(body);
     return res;
    }

    @GrpcMethod('AttributeGroupService', 'GetAttributeGroupByCategory')
    private async getAttributeGroupByCategory(body:{ "id" : number}):Promise<any> {
      const res = await this.service.getAttributeGroupByCategories(body.id)
      return res;
    }

    @GrpcMethod('AttributeGroupService', 'GetAllAttributeGroup')
    private async getAllAttributeGroups():Promise<any> {
      const res = await this.service.getAllAttributeGroups();
      return res;
    }

    @GrpcMethod('AttributeGroupService', 'AssignAttributesToAttributeGroup')
    private async assignAttributeToAttributeGroups(assignAttr:assignAttr):Promise<any> {
      const res = await this.service.assignAttributeToAttributeGroups(assignAttr);
      return res;
    }

    @GrpcMethod('AttributeGroupService', 'RemoveAttributesToAttributeGroup')
    private async removeAttributes( assignAttr: assignAttr): Promise<any> {
      const res = await this.service.removeAttributesFromAttributeGroups( assignAttr );
      return res;
    }

    @GrpcMethod('AttributeGroupService', 'UpdateAttributeGroup')
    private async updateAttributeGroups(attrGroupById:attrGroupById):Promise<any> {
      const res = await this.service.updateAttributeGroups(attrGroupById);
      return res;
    }

    @GrpcMethod('AttributeGroupService', 'DeleteAttributeGroup')
    private async deleteAttributeGroup(body:{ id: number }): Promise<any> {
      const res = await this.service.deleteAttributeGroups(body.id);
      return res;
    }

    @GrpcMethod('AttributeGroupService', 'MapAttributeGroupToCategory')
    private async mapAttributeGroups( categoryMapGroupReqDto: categoryMapGroupReqDto ): Promise<any> {
      const res = await this.service.mapAttributeGroupsToCategories( categoryMapGroupReqDto );
      return res;
    }

    @GrpcMethod('AttributeGroupService', 'GetAttributeGroupsByCategory')
    private async getAttributeGroupsByCategory():Promise<any> {

    }

}

@Controller()
export class PdmGrpcController {

  @Inject(AttributeService)
  private readonly service: AttributeService;

  @Inject(ValidationService)
  private readonly validationService: ValidationService;

  @Inject(PdmService)
  private readonly pdmService: PdmService;

  @GrpcMethod('PhysicalDataModelService', 'CreatePhysicalDataModel')
  private async createPhysicalDatamodel( idDto: idDto): Promise<any> {
    const res = await this.pdmService.createColumns(idDto.id);
    return res;
  }

  @GrpcMethod('PhysicalDataModelService', 'GetPhysicalDataModel')
  private async getPhysicalDataModel(body:{ id: number }): Promise<any> {
    const res = await this.pdmService.getPhysicalModel(body.id);
    return res;
  }

}