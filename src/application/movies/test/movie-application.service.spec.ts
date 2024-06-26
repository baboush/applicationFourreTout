import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MovieRepositoryPersistence } from '@infrastructure/persistence/repositories';
import { MovieServiceImp } from '../movie.service';
import { CreateMovieDtoImp, ReadMovieDtoImp } from '../dto';
import { MovieEntity, UpdateMovieDto } from '@domain/movies';

describe('MovieApplicationService', () => {
  let service: MovieServiceImp;
  let repo: MovieRepositoryPersistence;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieServiceImp,
        {
          provide: MovieRepositoryPersistence,
          useValue: {
            createMovie: jest.fn(),
            findAllMovie: jest.fn(),
            findOneMovie: jest.fn(),
            updateMovie: jest.fn(),
            deleteMovie: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MovieServiceImp>(MovieServiceImp);
    repo = module.get<MovieRepositoryPersistence>(MovieRepositoryPersistence);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAndPublishMovie', () => {
    it('should throw BadRequestException if movie data is invalid', async () => {
      const movie: CreateMovieDtoImp = {} as any;
      await expect(service.createAndPublishMovie(movie)).rejects.toThrowError(BadRequestException);
    });

    it('should create a movie if data is valid', async () => {
      const movie: CreateMovieDtoImp = { 
        title: 'The Shawshank Redemption',
        poster: 'https://example.com/poster.jpg',
        director: 'Frank Darabont',
      } as any;
      const createdMovie = { 
        title: 'The Shawshank Redemption',
        poster: 'https://example.com/poster.jpg',
        director: 'Frank Darabont',
      } as any;
      jest.spyOn(repo, 'createMovie').mockResolvedValueOnce(createdMovie);
      await expect(service.createAndPublishMovie(movie)).resolves.toEqual(createdMovie);
    });

    describe('findSavedMoviesList', () => {
       it('should throw NotFoundException if movies does not exist', async () => {
        jest.spyOn(repo, 'findAllMovie').mockResolvedValueOnce(undefined);
        await expect(service.findSavedMoviesList()).rejects.toThrow(NotFoundException);
      });

      it('should return a list of movies', async () => {
        const movies: MovieEntity[] = [
          {
            id: 1,
            title: 'The Shawshank Redemption',
            director: 'Frank Darabont',
            poster: 'gfdgdfgdfg'
          },
          {
            id: 2,
            title: 'The Godfather',
            director: 'Francis Ford Coppola',
            poster: 'fsdfsdfsdfsdf'
          } as any];
        jest.spyOn(repo, 'findAllMovie').mockResolvedValueOnce(movies);
        await expect(service.findSavedMoviesList()).resolves.toEqual(movies);
      });
    });

    describe('findOneSavedMovie', () => {
      it('should throw NotFoundException if movie does not exist', async () => {
        const id = 1;
        jest.spyOn(repo, 'findOneMovie').mockResolvedValueOnce(undefined);
        await expect(service.findOneSavedMovie(id)).rejects.toThrow(NotFoundException);
      });

      it('should return a movie if it exists', async () => {
        const id = 1;
        const movie: ReadMovieDtoImp = { 
          id: 1,
          title: "Dalut",
          Poster: 'testset',
          director: 'sdfgjdklfgjdfklg',
        } as any;
        jest.spyOn(repo, 'findOneMovie').mockResolvedValueOnce(movie);
        await expect(service.findOneSavedMovie(id)).resolves.toEqual(movie);
      });
    });

    describe('updateMovieDetail', () => {
      it('should throw NotFoundException if movie id is not provided', async () => {
        const movie: UpdateMovieDto = {} as any;
        await expect(service.updateMovieDetail(movie)).rejects.toThrow(NotFoundException);
      });

      it('should update a movie if data is valid', async () => {
        const movie: UpdateMovieDto = { 
          id: 1, titre: 'test', poster:'test', director:'test'
        } as any;
        const updatedMovie = { id: 1, titre: 'test2', poster:'test2', director:'test2'  } as any;
        jest.spyOn(repo, 'updateMovie').mockResolvedValueOnce(updatedMovie);
        await expect(service.updateMovieDetail(movie)).resolves.toEqual(updatedMovie);
      });
    });

    describe('deleteSavedMovie', () => {
      it('should throw NotFoundException if movie does not exist', async () => {
        const id = 1;
        jest.spyOn(repo, 'deleteMovie').mockResolvedValueOnce(false);
        await expect(service.deleteSavedMovie(id)).rejects.toThrow(NotFoundException);
      });

      it('should delete a movie if it exists', async () => {
        const id = 1;
        jest.spyOn(repo, 'deleteMovie').mockResolvedValueOnce(true);
        await expect(service.deleteSavedMovie(id)).resolves.toEqual(true);
      });
    });
  });
});
