/* eslint-disable */

import {
  Controller,
  Post,
  Body,
  Get,
  Inject,
  Query,
  Put,
  Delete,
} from "@nestjs/common";
import { MasterService } from "./master.service";
import {
  masterDto,
  masterByIdDto,
  masterReferenceDto,
  masterReferenceByIdDto,
} from "src/dtos/master.dto";

@Controller("master")
export class MasterController {
  @Inject(MasterService)
  private readonly service: MasterService;

  // To create Master
  @Post("create")
  private async createMaster(@Body() masterDto: masterDto): Promise<any> {
    const res = await this.service.createMasters(masterDto);
    return res.masters;
  }

  // To get the master
  @Get("get")
  private async getMaster(@Query("id") id: number): Promise<any> {
    const res = await this.service.getMasters(id);
    return res.masters;
  }

  // To get all the Masters
  @Get("getAll")
  private async getAllMaster(): Promise<any> {
    const res = await this.service.getAllMasters();
    return { masters: res };
  }

  // To update the master
  @Put("update")
  private async updateMaster(
    @Body() masterByIdDto: masterByIdDto
  ): Promise<any> {
    const res = await this.service.updateMasters(masterByIdDto);
    return res.masters;
  }

  // To delete the master
  @Delete("delete")
  private async deleteMaster(@Query("id") id: number): Promise<any> {
    const res = await this.service.deleteMasters(id);
    return {};
  }
}

@Controller("referenceMaster")
export class ReferenceMasterController {
  @Inject(MasterService)
  private readonly service: MasterService;

  // To create Reference Master
  @Post("create")
  private async createReferenceMaster(
    @Body() masterReferenceDto: masterReferenceDto
  ): Promise<any> {
    const res = await this.service.createReferenceMasters(masterReferenceDto);
    return res.masters;
  }

  //To get the reference master
  @Get("get")
  private async getReferenceMaster(@Query("id") id: number): Promise<any> {
    const res = await this.service.getReferenceMasters(id);
    return res.masters;
  }

  //To get all the reference Masters
  @Get("getAll")
  private async getAllReferenceMasters(): Promise<any> {
    const res = await this.service.getAllReferenceMasters();
    return { referenceMasters: res };
  }

  // To update the master
  @Put("update")
  private async updateReferenceMaster(
    @Body() masterReferenceByIdDto: masterReferenceByIdDto
  ): Promise<any> {
    const res = await this.service.updateReferenceMasters(
      masterReferenceByIdDto
    );
    return res.masters;
  }

  // To delete the reference master
  @Delete("delete")
  private async deleteReferenceMaster(@Query("id") id: number): Promise<any> {
    const res = await this.service.deleteReferenceMasters(id);
    return {};
  }
}
