import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import * as compression from "compression";
import { SwaggerService } from "@shared/swagger/swagger.service";
import { CatchAllExceptionFilterFilter } from "@shared/filter/catch-all-exception.filter";
import { SwaggerModule } from "@nestjs/swagger";
import metadata from "./metadata";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  const swaggerService = app.get(SwaggerService);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.enableCors();
  app.use(helmet());
  await SwaggerModule.loadPluginMetadata(metadata);
  swaggerService.createDocumentSwagger(app);
  app.useGlobalFilters(new CatchAllExceptionFilterFilter({ httpAdapter }));

  await app.listen(3000);
}
bootstrap();
