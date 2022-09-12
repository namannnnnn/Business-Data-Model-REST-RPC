/* eslint-disable */

import { Module } from "@nestjs/common";
import { masterProviders } from "./master.provider";
import { DatabaseModule } from "../database/database.module";
import { MasterService } from "./master.service";
import { MasterGrpcController, ReferenceMasterGrpcController } from './masterGrpc.controller'
import {
  MasterController,
  ReferenceMasterController,
} from "./master.controller";

@Module({
  imports: [DatabaseModule],
  providers: [...masterProviders, MasterService],
  controllers: [MasterController, ReferenceMasterController, MasterGrpcController, ReferenceMasterGrpcController],
  exports: [],
})
export class MasterModule {}
