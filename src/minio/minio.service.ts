import { Inject, Injectable, Logger } from "@nestjs/common";
import * as minio from "minio";
import { MODULE_OPTIONS_TOKEN } from "./minio.module-definition";
import { type ClientOptions } from "minio";

interface INestMinioService {
  getMinio(): minio.Client;
}

@Injectable()
export class MinioService implements INestMinioService {
  private minioConnection: minio.Client;

  private readonly logger = new Logger(MinioService.name);

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private MinioOptions: ClientOptions
  ) {}

  getMinio(): minio.Client {
    if (!this.minioConnection) {
      this.minioConnection = new minio.Client(this.MinioOptions);
    }
    return this.minioConnection;
  }

  checkConnection() {
    this.minioConnection
      .listBuckets()
      .then(() => {
        this.logger.log("Successfully connected to minio.");
      })
      .catch((error) => {
        this.logger.error(error);
      });
  }
}
