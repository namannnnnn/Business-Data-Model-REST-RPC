/* eslint-disable */

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { attributeProviders } from "./attribution.provider";
import { validationProviders } from "./validation.provider";
import { categoryProviders } from "./category.provider";
import { DatabaseModule } from "../database/database.module";
import { AttributeService } from "./attribution.service";
import { PdmService } from "./pdm.service";
import { ValidationService } from "./validation.service";
import {
  ReferenceAttributeController,
  AttributeController,
  AttributeGroupController,
  PdmController,
} from "./attribution.controller";
import { ReferenceAttributeGrpcController, AttributeGrpcController,   AttributeGroupGrpcController, PdmGrpcController,
} from './attributionGrpc.controller'
// import { ValidationService } from './validation.service';
// import { mappingProviders } from 'src/mappingProviders/category.provider';
import { PdmTables } from "../entities/pdmTables.entity";

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([PdmTables], "PDM")],
  providers: [
    ...attributeProviders,
    ...validationProviders,
    ...categoryProviders,
    AttributeService,
    ValidationService,
    PdmService,
  ],
  controllers: [
    ReferenceAttributeController,
    ReferenceAttributeGrpcController,
    AttributeGrpcController,
    AttributeController,
    AttributeGroupController,
    AttributeGroupGrpcController,
    PdmController,
    PdmGrpcController
  ],
  exports: [],
})
export class AttributeModule {}
