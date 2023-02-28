import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ReverseShareModule } from "src/reverseShare/reverseShare.module";
import { ShareModule } from "src/share/share.module";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { DownLogModule } from "src/downlog/downlog.module";

@Module({
  imports: [
    JwtModule.register({}), 
    ReverseShareModule, 
    ShareModule, 
    forwardRef(() => DownLogModule),

  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
