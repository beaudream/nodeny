import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { DownLogService } from "./downlog.service";
import { DownLogController } from "./downlog.controller";
import { FileModule } from "src/file/file.module";

@Module({
  imports: [
    JwtModule.register({}),
  ],
  providers: [DownLogService],
  exports: [DownLogService],
})
export class DownLogModule {}
