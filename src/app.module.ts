import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SwaggerService } from "@shared/swagger/swagger.service";
import * as Joi from "joi";
import configuration from "./infrastructure/config/configuration";
import { DataSourceService } from "@infrastructure/persistence/data-access/data-source.service";
import { AuthApplcationModule } from "@application/auth";
import { MovieApplicationModule } from "@application/movie/movie-application.module";
import { CategoriesApplicationModule } from "@application/categories/categories-application.module";
import { BookApplicationModule } from "@application/books/book-application.module";

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
    MovieApplicationModule,
    CategoriesApplicationModule,
    BookApplicationModule,
  ],
  controllers: [],
  providers: [SwaggerService],
})
export class AppModule {}
