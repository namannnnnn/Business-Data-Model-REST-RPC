/* eslint-disable */

import {
  Controller,
  Get,
  Inject,
  Post,
  Put,
  Query,
  Delete,
  Body,
} from "@nestjs/common";
import { AttributeService } from "./attribution.service";
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

@Controller("referenceAttribute")
export class ReferenceAttributeController {
  @Inject(AttributeService)
  private readonly service: AttributeService;

  @Post("create")
  private async createReferenceAttribute(
    @Body() refAttrDto: refAttrDto
  ): Promise<any> {
    const res = await this.service.createReferenceAttributes(refAttrDto);
    return res.attributes;
  }

  @Get("get")
  private async getReferenceAttribute(@Query("id") id: number): Promise<any> {
    const res = await this.service.getReferenceAttributes(id);
    return res.attributes;
  }

  @Get("getAll")
  private async getAllReferenceAttribute(): Promise<any> {
    const res = await this.service.getAllReferenceAttributes();
    return { referenceAttributes: res };
  }

  @Get("getReferenceMastersAttributes")
  private async getReferenceMastersAttribute(
    @Query("id") id: number
  ): Promise<any> {
    const res = await this.service.getReferenceMastersAttributes(id);
    return res;
  }

  @Put("update")
  private async updateReferenceAttribute(
    @Body() refAttrByIdDto: refAttrByIdDto
  ): Promise<any> {
    const res = await this.service.updateReferenceAttributes(refAttrByIdDto);
    return res;
  }

  @Delete("delete")
  private async deleteReferenceAttribute(
    @Query("id") id: number
  ): Promise<any> {
    const res = await this.service.deleteReferenceAttributes(id);
    return res;
  }
}

@Controller("attributes")
export class AttributeController {
  @Inject(AttributeService)
  private readonly service: AttributeService;

  @Inject(ValidationService)
  private readonly validationService: ValidationService;

  @Post("create")
  private async createAttribute(@Body() attrDto: attrDto): Promise<any> {
    const res = await this.service.createAttributes(attrDto);
    return res.attributes;
  }

  @Post("createByCategory")
  private async createAttributeByCategory(
    @Body() attrCatDto: attrCatDto
  ): Promise<any> {
    const res = await this.service.createAttributeByCategories(attrCatDto);
    return res.attributes;
  }

  @Get("get")
  private async getAttribute(@Query("id") id: number): Promise<any> {
    const res = await this.service.getAttributes(id);
    return res.attributes;
  }

  @Get("fetchReferenceAttributes")
  private async fetchReferenceAttributess(
    @Query("id") id: number
  ): Promise<any> {
    const res = await this.service.fetchReferenceAttributes(id);
    return res;
  }

  @Get("getAll")
  private async getAllAttribute(): Promise<any> {
    const res = await this.service.getAllAttributes();
    return { attributes: res };
  }

  @Get("getAttributesByCategory")
  private async getAttributesByCategory(@Query("id") id: number): Promise<any> {
    const res = await this.service.getAttributesForCategory(id);
    return res;
  }

  @Post("mapAttributesToCategories")
  private async mapAttributesToCategories(
    @Body() categoryMapReqDto: categoryMapReqDto
  ): Promise<any> {
    const res = await this.service.mapAttributesToCategories(categoryMapReqDto);
    return res;
  }

  @Get("findValidation")
  private async findValidation(@Query("id") id: number): Promise<any> {
    const res = await this.validationService.findValidation(id);
    return res;
  }

  @Put("updateValidation")
  private async updateValidation(
    @Body()
    validation:
      | dateVldnById
      | boolVldnById
      | rangeVldnById
      | singleSelectVldnById
      | textVldnById
      | numericVldnById
      | timeVldnById
      | multipleSelectionVldnById
      | dropDownVldnById
      | urlVldnById
  ): Promise<any> {
    const res = await this.validationService.updateValidation(validation);
    return res;
  }

  @Put("update")
  private async updateAttribute(
    @Body() attrByIdDto: attrByIdDto
  ): Promise<any> {
    const res = await this.service.updateAttributes(attrByIdDto);
    return res;
  }

  @Delete("delete")
  private async deleteAttribute(@Query("id") id: number): Promise<any> {
    const res = await this.service.deleteAttributes(id);
    return res;
  }
}

@Controller("attributeGroup")
export class AttributeGroupController {
  @Inject(AttributeService)
  private readonly service: AttributeService;

  @Post("create")
  private async createAttributeGroup(
    @Body() attrGroupReqDto: attrGroupReqDto
  ): Promise<any> {
    const res = await this.service.createAttributeGroups(attrGroupReqDto);
    return res;
  }

  @Get("get")
  private async getAttributeGroup(@Query("id") id: number): Promise<any> {
    const res = await this.service.getAttributeGroups(id);
    return res;
  }

  @Get("getByCategory")
  private async getAttributeGroupByCategory(
    @Query("id") id: number
  ): Promise<any> {
    const res = await this.service.getAttributeGroupByCategories(id);
    return res;
  }

  @Get("getAll")
  private async getAllAttributeGroups(): Promise<any> {
    const res = await this.service.getAllAttributeGroups();
    return res;
  }

  @Post("mapAttributeGroups")
  private async mapAttributeGroups(
    @Body() categoryMapGroupReqDto: categoryMapGroupReqDto
  ): Promise<any> {
    const res = await this.service.mapAttributeGroupsToCategories(
      categoryMapGroupReqDto
    );
    return res;
  }

  @Post("assignAttributes")
  private async assignAttributes(@Body() assignAttr: assignAttr): Promise<any> {
    const res = await this.service.assignAttributeToAttributeGroups(assignAttr);
    return res;
  }

  @Post("removeAttributes")
  private async removeAttributes(@Body() assignAttr: assignAttr): Promise<any> {
    const res = await this.service.removeAttributesFromAttributeGroups(
      assignAttr
    );
    return res;
  }

  @Put("update")
  private async updateAttributeGroups(
    @Body() attrGroupById: attrGroupById
  ): Promise<any> {
    const res = await this.service.updateAttributeGroups(attrGroupById);
    return res;
  }

  @Delete("delete")
  private async deleteAttributeGroup(@Query("id") id: number): Promise<any> {
    const res = await this.service.deleteAttributeGroups(id);
    return res;
  }
}

@Controller("pdm")
export class PdmController {
  @Inject(AttributeService)
  private readonly service: AttributeService;

  @Inject(PdmService)
  private readonly pdmService: PdmService;

  @Post("createPhysicalDatamodel")
  private async createPhysicalDatamodel(@Body() idDto: idDto): Promise<any> {
    const res = await this.pdmService.createColumns(idDto.id);
    return res;
  }

  @Get("getPhysicalDataModel")
  private async getPhysicalDataModel(@Query("id") id: number): Promise<any> {
    const res = await this.pdmService.getPhysicalModel(id);
    return res;
  }
}
