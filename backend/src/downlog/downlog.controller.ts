import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  StreamableFile,
  UseGuards,
} from "@nestjs/common";
import { SkipThrottle } from "@nestjs/throttler";
import * as contentDisposition from "content-disposition";
import { DownLogService } from "./downlog.service";

@Controller("shares/:shareId/files")
export class DownLogController {
  constructor(private downLogService: DownLogService) {}

  @Post()
  @SkipThrottle()
  async create(
    @Query() query: any,
    @Body() body: string,
    @Param("shareId") shareId: string
  ) {
    const { id, name, chunkIndex, totalChunks } = query;

    const data = body.toString().split(",")[1];

    // return await this.fileService.create(
    //   data,
    //   { index: parseInt(chunkIndex), total: parseInt(totalChunks) },
    //   { id, name },
    //   shareId
    // );
    return;
  }
  
}
