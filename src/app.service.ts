import { Client } from "minio";
import { MINIO_CONNECTION } from "./minio/minio.connection-providers";
import { Injectable, Inject } from "@nestjs/common";
import { AppDto } from "./app.dto";
import * as crypto from "crypto";
import * as process from "process";

@Injectable()
export class AppService {
  constructor(@Inject(MINIO_CONNECTION) private readonly minioClient: Client) {}

  putObject(appDto: AppDto) {
    const hash = crypto
      .createHmac("sha256", "secret")
      .update(appDto.fileName)
      .digest("hex");
    return this.minioClient.putObject(
      process.env.STORAGE_BUCKET ?? "test",
      hash,
      appDto.stream,
      appDto?.size
    );
  }
}
