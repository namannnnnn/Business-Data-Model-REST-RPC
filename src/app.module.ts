/* eslint-disable */

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AttributeModule } from "./attribution/attribution.module";
import { MasterModule } from "./master/master.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PhysicalDataModel } from "./database/database.provider";

@Module({
  imports: [
    AttributeModule,
    MasterModule,
    TypeOrmModule.forRoot({ ...PhysicalDataModel, name: "PDM" }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}