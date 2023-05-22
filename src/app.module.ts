import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MinioModule } from "./minio/minio.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MinioModule.register({
      isGlobal: true,
      endPoint: process.env.STORAGE_ENDPOINT,
      port: parseInt(process.env.STORAGE_PORT),
      useSSL: process.env.STORAGE_USE_SSL === "true",
      accessKey: process.env.STORAGE_USER,
      secretKey: process.env.STORAGE_PASSWORD,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
