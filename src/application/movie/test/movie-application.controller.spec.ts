import { Test, TestingModule } from '@nestjs/testing';
import { MovieApplicationController } from './movie-application.controller';

describe('MovieApplicationController', () => {
  let controller: MovieApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieApplicationController],
    }).compile();

    controller = module.get<MovieApplicationController>(MovieApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
