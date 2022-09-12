/* eslint-disable */

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

export class attrDto {
  tenantId: number;
  attributeName: string;
  labelName: string;
  labelDescription: string;
  attributeType: string;
  constraint: boolean;
  masterId: number;
  referenceMasterId: number;
  attributeGroupId: number;
  validation:
    | dateVldn
    | boolVldn
    | rangeVldn
    | singleSelectVldn
    | textVldn
    | numericVldn
    | timeVldn
    | multipleSelectionVldn
    | dropDownVldn
    | urlVldn;
  status: boolean;
}

export class attrCatDto {
  tenantId: number;
  categoryId: number;
  attributeName: string;
  labelName: string;
  labelDescription: string;
  attributeType: string;
  constraint: boolean;
  masterId: number;
  referenceMasterId: number;
  attributeGroupId: number;
  validation:
    | dateVldn
    | boolVldn
    | rangeVldn
    | singleSelectVldn
    | textVldn
    | numericVldn
    | timeVldn
    | multipleSelectionVldn
    | dropDownVldn
    | urlVldn;
  status: boolean;
}

export class attrByIdDto {
  id: number;
  tenantId: number;
  attributeName: string;
  labelName: string;
  labelDescription: string;
  attributeType: string;
  constraint: boolean;
  masterId: number;
  referenceMasterId: number;
  attributeGroupId: number;
  status: boolean;
}

export class attrByIdResDto {
  id: number;
  tenantId: number;
  attributeName: string;
  labelName: string;
  labelDescription: string;
  attributeType: string;
  constraint: boolean;
  masterId: number;
  referenceMasterId: number;
  attributeGroupId: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class attrGroupReqDto {
  tenantId: number;
  attributeGroupName: string;
  status: boolean;
  attributes: Array<attrDto>;
}

export class attrGroupReqCatDto {
  tenantId: number;
  categoryId: number;
  attributeGroupName: string;
  status: boolean;
  attributes: Array<attrDto>;
}

export class attrGroupById {
  id: number;
  tenantId: number;
  attributeGroupName: string;
  status: boolean;
}

export class assignAttr {
  id: number;
  attributes: number[] = [];
}

export class attrGroupResDto {
  id: number;
  tenantId: number;
  attributeGroupName: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  attributes: attrByIdResDto[] = [];
}
