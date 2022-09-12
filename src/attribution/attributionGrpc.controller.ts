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
    assignAttr,
    attrGroupById,
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
    private async createAttributeGroup( attrGroupReqDto: attrGroupReqDto): Promise<any> {
      const res = await this.service.createAttributeGroups(attrGroupReqDto);
      return res;
    }

    @GrpcMethod('AttributeGroupService', 'GetAttributeGroup')
    private async getAttributeGroup(body :{ id: number }): Promise<any> {
      const res = await this.service.getAttributeGroups(body.id);
      return res;
    }

    
    @GrpcMethod('AttributeGroupService', 'CreateAttributeGroupByCategory')
    private async createAttributeGroupByCategory(attrGroupReqCatDto:attrGroupReqCatDto):Promise<any> {
      private as
    }


    

    @GrpcMethod('AttributeGroupService', 'GetAttributeGroupByCategory')

    @GrpcMethod('AttributeGroupService', 'GetAllAttributeGroup')

    @GrpcMethod('AttributeGroupService', 'AssignAttributesToAttributeGroup')

    @GrpcMethod('AttributeGroupService', 'RemoveAttributesToAttributeGroup')

    @GrpcMethod('AttributeGroupService', 'UpdateAttributeGroup')

    @GrpcMethod('AttributeGroupService', 'DeleteAttributeGroup')

    @GrpcMethod('AttributeGroupService', 'MapAttributeGroupToCategory')

    @GrpcMethod('AttributeGroupService', 'GetAttributeGroupsByCategory')


}