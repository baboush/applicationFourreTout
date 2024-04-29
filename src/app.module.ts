import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './infrastructure/config/configuration';
import Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceService } from '@infrastructure/persistence';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().port().default(3000),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useClass: DataSourceService,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
