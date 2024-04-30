import { INestApplication, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Injectable()
export class SwaggerService {
  constructor(private readonly configService: ConfigService) {}

  configSwagger = new DocumentBuilder()
    .setTitle(this.configService.get<string>('title'))
    .setDescription(this.configService.get<string>('description'))
    .setVersion(this.configService.get<string>('version'))
    .build();

  createDocumentSwagger(app: INestApplication) {
    const config = this.configSwagger;
    const documentSwagger = SwaggerModule.createDocument(app, config);
    return SwaggerModule.setup('api', app, documentSwagger);
  }
}
