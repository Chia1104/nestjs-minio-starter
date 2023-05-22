import { Module, OnModuleInit } from "@nestjs/common";
import { MinioService } from "./minio.service";
import { ConfigurableModuleClass } from "./minio.module-definition";
import { connectionFactory } from "./minio.connection-providers";

@Module({
  providers: [MinioService, connectionFactory],
  exports: [MinioService, connectionFactory],
})
export class MinioModule
  extends ConfigurableModuleClass
  implements OnModuleInit
{
  constructor(readonly service: MinioService) {
    super();
  }
  onModuleInit() {
    this.service.checkConnection();
  }
}
