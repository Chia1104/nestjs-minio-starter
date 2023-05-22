import { MinioService } from "./minio.service";

export const MINIO_CONNECTION = "MINIO_CONNECTION";

export const connectionFactory = {
  provide: MINIO_CONNECTION,
  useFactory: async (minioService) => {
    return minioService.getMinio();
  },
  inject: [MinioService],
};
