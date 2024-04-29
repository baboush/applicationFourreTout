import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DataSourceService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      port: this.configService.get<number>('ports'),
      username: this.configService.get<string>('database_usr'),
      password: this.configService.get<string>('database_passd'),
      database: this.configService.get<string>('database'),
    };
  }
}
