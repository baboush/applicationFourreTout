import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import { SwaggerService } from '@shared/swagger/swagger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.use(compression());
  const swaggerService = app.get(SwaggerService);
  swaggerService.createDocumentSwagger(app);

  await app.listen(3000);
}
bootstrap();
