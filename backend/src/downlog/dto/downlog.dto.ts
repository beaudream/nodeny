import { Expose, plainToClass } from "class-transformer";
import { FileDTO } from "src/file/dto/file.dto";

export class DownLogDTO {
  @Expose()
  id: string;

  @Expose()
  takenTime: number;

  @Expose()
  ip: string;
  
  @Expose()
  downTime: Date;

  // @Expose()
  // file: FileDTO

  from(partial: Partial<DownLogDTO>) {
    return plainToClass(DownLogDTO, partial, { excludeExtraneousValues: true });
  }
}
