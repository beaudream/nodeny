import { Expose } from "class-transformer";

export class DownLogDTO {
  @Expose()
  id: string;

  @Expose()
  takenTime: number;

  @Expose()
  ip: string;

  @Expose()
  createdAt: Date
  
}
