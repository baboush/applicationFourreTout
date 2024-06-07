import { INestApplication, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import metadata from "src/metadata";
import * as fs from "fs";

@Injectable()
export class SwaggerService {
  constructor(private readonly configService: ConfigService) {}

  configSwagger = new DocumentBuilder()
    .setTitle(this.configService.get<string>("swagger.title"))
    .setDescription(this.configService.get<string>("swagger.description"))
    .setVersion(this.configService.get<string>("swagger.version"))
    .addSecurity("JWT", {
      type: "http",
      scheme: "bearer",
      bearerFormat: "Authorization",
      in: "header",
    })
    .build();

  async createDocumentSwagger(app: INestApplication) {
    const config = this.configSwagger;
    const documentSwagger = SwaggerModule.createDocument(app, config);
    const yaml = JSON.stringify(documentSwagger, null, 2); // Indent for readability
    fs.writeFileSync("openapi.yaml", yaml); // Save to a file
    return SwaggerModule.setup("api", app, documentSwagger);
  }
}
