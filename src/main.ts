import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import { SwaggerService } from '@shared/swagger/swagger.service';
import { CatchAllExceptionFilterFilter } from '@shared/filter/catch-all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerService = app.get(SwaggerService);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.enableCors();
  app.use(helmet());
  app.use(compression());
  swaggerService.createDocumentSwagger(app);
  app.useGlobalFilters(new CatchAllExceptionFilterFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
