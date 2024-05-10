import { UserEntity } from "@domain/Auth";
import { AppointmentEntity } from "@domain/appointements";
import { BookEntity } from "@domain/books";
import { CategoriesEntity } from "@domain/categories";
import { FavoriesEntity } from "@domain/favories";
import { MovieEntity } from "@domain/movies";
import { ProfileEntity } from "@domain/profiles";
import { TaskEntity } from "@domain/tasks";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class DataSourceService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "mysql",
      port: this.configService.get<number>("db.mysql.port"),
      username: this.configService.get<string>("db.mysql.database_usr"),
      password: this.configService.get<string>("db.mysql.database_password"),
      database: this.configService.get<string>("db.mysql.database"),
      entities: [
        UserEntity,
        ProfileEntity,
        FavoriesEntity,
        CategoriesEntity,
        MovieEntity,
        BookEntity,
        TaskEntity,
        AppointmentEntity,
      ],
      migrations: ["../migrations/"],
      synchronize: true,
    };
  }
}
