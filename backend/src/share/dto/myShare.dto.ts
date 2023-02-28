import { Expose, plainToClass, Type } from "class-transformer";
import { AccessLogDTO } from "./accessLog.dto";
import { DownLogDTO } from "./downLog.dto";
import { ShareDTO } from "./share.dto";

export class MyShareDTO extends ShareDTO {
  @Expose()
  views: number;

  @Expose()
  createdAt: Date;

  @Expose()
  recipients: string[];

  @Expose()
  @Type(() => AccessLogDTO)
  accessLogs: AccessLogDTO[];

  @Expose()
  @Type(() => DownLogDTO)
  downLogs: DownLogDTO[];

  from(partial: Partial<MyShareDTO>) {
    return plainToClass(MyShareDTO, partial, { excludeExtraneousValues: true });
  }

  fromList(partial: Partial<MyShareDTO>[]) {
    return partial.map((part) =>
      plainToClass(MyShareDTO, part, { excludeExtraneousValues: true })
    );
  }
}
