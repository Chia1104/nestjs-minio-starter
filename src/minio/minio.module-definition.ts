import { ConfigurableModuleBuilder } from "@nestjs/common";
import { type ClientOptions } from "minio";

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<ClientOptions>()
    .setExtras(
      {
        isGlobal: true,
      },
      (definition, extras) => ({
        ...definition,
        global: extras.isGlobal,
      })
    )
    .build();
