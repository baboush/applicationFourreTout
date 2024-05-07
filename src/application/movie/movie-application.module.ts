import { Module } from '@nestjs/common';
import { MovieApplicationService } from './movie-application.service';
import { MovieApplicationController } from './movie-application.controller';

@Module({
  providers: [MovieApplicationService],
  controllers: [MovieApplicationController]
})
export class MovieApplicationModule {}
