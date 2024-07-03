import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import * as compression from "compression";
import { SwaggerService } from "@shared/swagger/swagger.service";
import { SwaggerModule } from "@nestjs/swagger";
import metadata from "./metadata";
import { BadRequestException, Logger, ValidationPipe } from "@nestjs/common";
import { CatchAllExceptionFilter } from "@shared/filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  const swaggerService = app.get(SwaggerService);
  const httpAdapter = app.get(HttpAdapterHost);
  const logger = new Logger("Bootstrap");

  app.enableCors();
  app.use(helmet());
  await SwaggerModule.loadPluginMetadata(metadata);
  swaggerService.createDocumentSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
    }),
  );
  app.useGlobalFilters(new CatchAllExceptionFilter(httpAdapter, logger));
  await app.listen(3000);
}
bootstrap();
