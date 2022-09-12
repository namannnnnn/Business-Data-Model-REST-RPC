/* eslint-disable */

export class masterDto {
  masterEntityName: string;
  masterEntityType: string;
  masterEntityDescription: string;
  masterEntityLevels: number;
  hierarchyDescription: string;
  tenantId: number;
  status: boolean;
}

export class masterByIdDto {
  id: number;
  masterEntityName: string;
  masterEntityType: string;
  masterEntityDescription: string;
  masterEntityLevels: number;
  hierarchyDescription: string;
  tenantId: number;
  status: boolean;
}

export class masterReferenceDto {
  masterEntityName: string;
  masterEntityType: string;
  masterEntityDescription: string;
  masterColumnName: string;
  tenantId: number;
  status: boolean;
}

export class masterReferenceByIdDto {
  id: number;
  masterEntityName: string;
  masterEntityType: string;
  masterEntityDescription: string;
  masterColumnName: string;
  tenantId: number;
  status: boolean;
}
