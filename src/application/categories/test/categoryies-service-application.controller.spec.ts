import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException  } from '@nestjs/common';
import { CategoriesRepositoryPersistence } from '@infrastructure/persistence/repositories/categories';

describe('CategoryiesApplicationService', () => {
  let service: CategoriesServiceImp,
  let repo: CategoriesRepositoryPersistence;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryiesApplicationService,
        {
          provide: CategoriesRepositoryPersistence,
          useValue: {
            createCategory: jest.fn(),
            removeCategory: jest.fn(),
            addCategoryMovie: jest.fn(),
            removeCategoryMovie: jest.fn(),
            findCategories: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryiesApplicationService>(CategoryiesApplicationService);
    repo = module.get<CategoriesRepositoryPersistence>(CategoriesRepositoryPersistence);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCategoryAndPublish', () => {
    it('should throw BadRequestException if category data is invalid', async () => {
      const category: CreateCategoryDtoImp = {} as any;
      await expect(service.createCategoryAndPublish(category)).rejects.toThrow(BadRequestException);
    });

    it('should create a category if data is valid', async () => {
      const category: CreateCategoryDtoApplication = 
        { name: 'Action' } as any;
      const createdCategory = { /* created category data */ } as any;
      jest.spyOn(repo, 'createCategory').mockResolvedValueOnce(createdCategory);
      await expect(service.createCategoryAndPublish(category)).resolves.toEqual(createdCategory);
    });
  });

});

