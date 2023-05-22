import {
  Controller,
  Put,
  ParseFilePipeBuilder,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(FileInterceptor("file"))
  @Put("file")
  async putObject(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: process.env.FILE_TYPE ?? /(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: parseInt(process.env.MAX_FILE_SIZE) || 1024 * 1024 * 5,
        })
        .build({
          fileIsRequired: true,
        })
    )
    file: Express.Multer.File,
  ) {
    return this.appService.putObject({
      fileName: file?.originalname ?? "",
      stream: file.buffer,
      size: file.size,
    });
  }
}
