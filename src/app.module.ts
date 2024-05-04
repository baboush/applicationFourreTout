import { DataSourceService } from '@infrastructure/persistence';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwaggerService } from '@shared/swagger/swagger.service';
import * as Joi from 'joi';
import configuration from './infrastructure/config/configuration';
import { AuthApplcationModule } from '@application/user/auth';

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
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().port().default(3000),
      }),
    }),
    AuthApplcationModule,
  ],
  controllers: [],
  providers: [SwaggerService],
})
export class AppModule {}
