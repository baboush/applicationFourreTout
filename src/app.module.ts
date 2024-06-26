import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SwaggerService } from "@shared/swagger/swagger.service";
import * as Joi from "joi";
import configuration from "./infrastructure/config/configuration";
import { DataSourceService } from "@infrastructure/persistence/data-access/data-source.service";
import { AuthApplcationModule } from "@application/auth";
import { MovieModule } from "@application/movies";
import { CategoriesModule } from "@application/categories";
import { BookModule } from "@application/books";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DataSourceService,
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid("development", "production", "test", "provision")
          .default("development"),
        PORT: Joi.number().port().default(3000),
      }),
    }),
    AuthApplcationModule,
    MovieModule,
    CategoriesModule,
    BookModule,
  ],
  controllers: [],
  providers: [SwaggerService],
})
export class AppModule {}
