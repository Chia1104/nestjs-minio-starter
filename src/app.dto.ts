import internal from "stream";

export interface AppDto {
  fileName: string;
  stream: string | internal.Readable | Buffer;
  size?: number;
}