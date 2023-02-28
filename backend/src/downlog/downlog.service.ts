import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Prisma, DownLog } from "@prisma/client";
import * as crypto from "crypto";
import * as fs from "fs";
import * as mime from "mime-types";
import { ConfigService } from "src/config/config.service";
import { PrismaService } from "src/prisma/prisma.service";
import { DownLogDTO } from "./dto/downlog.dto";

@Injectable()
export class DownLogService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService
  ) {}

  async create(
    takenTime: number,
    ip: string,
    shareId: string,
    fileId: string,
  ): Promise<DownLog | null> {
    const downlog = await this.prisma.downLog.create({
      data: {
        takenTime: takenTime,
        ip,
        share: { connect: { id: shareId } },
        file: { connect: {id: fileId}},
      },
    });
    return downlog
  }

}
