import { Appointment } from '@domain/entities/Appointment.entity';
import { Books } from '@domain/entities/Books.entity';
import { Categories } from '@domain/entities/Categories.entity';
import { Favories } from '@domain/entities/Favories.entity';
import { Movies } from '@domain/entities/Movies.entity';
import { Profile } from '@domain/entities/Profile.entity';
import { Tasks } from '@domain/entities/Tasks.entity';
import { User } from '@domain/entities/User.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DataSourceService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      port: this.configService.get<number>('db.mysql.ports'),
      username: this.configService.get<string>('db.mysql.database_usr'),
      password: this.configService.get<string>('db.mysql.database_passd'),
      database: this.configService.get<string>('db.mysql.database'),
      entities: [
        User,
        Profile,
        Favories,
        Categories,
        Movies,
        Books,
        Tasks,
        Appointment,
      ],
    };
  }
}
