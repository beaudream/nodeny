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
import { Response } from "express";
import { CreateShareGuard } from "src/share/guard/createShare.guard";
import { ShareOwnerGuard } from "src/share/guard/shareOwner.guard";
import { FileService } from "./file.service";
import { DownLogService } from "src/downlog/downlog.service";
import { FileSecurityGuard } from "./guard/fileSecurity.guard";

@Controller("shares/:shareId/files")
export class FileController {
  constructor(private fileService: FileService, private downLogService: DownLogService) {}
  // constructor(private fileService: FileService) {}

  @Post()
  @SkipThrottle()
  @UseGuards(CreateShareGuard, ShareOwnerGuard)
  async create(
    @Query() query: any,
    @Body() body: string,
    @Param("shareId") shareId: string
  ) {
    const { id, name, chunkIndex, totalChunks } = query;

    const data = body.toString().split(",")[1];

    return await this.fileService.create(
      data,
      { index: parseInt(chunkIndex), total: parseInt(totalChunks) },
      { id, name },
      shareId
    );
  }

  @Get("zip")
  @UseGuards(FileSecurityGuard)
  async getZip(
    @Res({ passthrough: true }) res: Response,
    @Param("shareId") shareId: string
  ) {
    const zip = this.fileService.getZip(shareId);
    res.set({
      "Content-Type": "application/zip",
      "Content-Disposition": contentDisposition(`pingvin-share-${shareId}.zip`),
    });

    return new StreamableFile(zip);
  }

  @Get(":fileId")
  @UseGuards(FileSecurityGuard)
  async getFile(
    @Res({ passthrough: true }) res: Response,
    @Param("shareId") shareId: string,
    @Param("fileId") fileId: string,
    @Query("download") download = "true"
  ) {
    const startDate = new Date();
    const file = await this.fileService.get(shareId, fileId);

    const headers = {
      "Content-Type": file.metaData.mimeType,
      "Content-Length": file.metaData.size,
    };

    if (download === "true") {
      headers["Content-Disposition"] = contentDisposition(file.metaData.name);
    }

    res.set(headers);

    file.file.on('error', function (error) {
      console.log(`error: ${error.message}`);
    })
    file.file.on('end', async () => {
      const downTime = new Date();
      const takenTime: number = downTime.valueOf() - startDate.valueOf();
      const ip: string = '10.10.10.10';
      const res = await this.downLogService.create(
        takenTime,
        ip,
        shareId,
        fileId
      );
    })
    
    return new StreamableFile(file.file);
  }

  @Put(":fileId")
  @UseGuards(FileSecurityGuard)
  async updateFile(
    @Param("fileId") fileId: string,
    @Query("status") status: string
  ) {
    await this.fileService.setStatus(fileId, status);
    return {
      message: "OK",
    };
  }
}
