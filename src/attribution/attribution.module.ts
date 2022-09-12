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
import { ReferenceAttributeGrpcController, AttributeGrpcController } from './attributionGrpc.controller'
// import { ValidationService } from './validation.service';
// import { mappingProviders } from 'src/mappingProviders/category.provider';
import { PdmTables } from "../Entities/pdmTables.entity";

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
    PdmController,
  ],
  exports: [],
})
export class AttributeModule {}
