import { Expose } from "class-transformer";

export class AccessLogDTO {
  @Expose()
  id: string;

  @Expose()
  timestamp: Date;

  @Expose()
  ip: string;
}
