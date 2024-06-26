import { AuthRepositoryPersistence } from "./auth/auth-repository-persistence";
import { AuthRepositoryModule } from "./auth/auth-repository.module";

// import Movie module MovieRepository
import { MovieRepositoryModule } from "./movies/movie-repository.module";
import { MovieRepositoryPersistence } from "./movies/movie-repository-persistence";
import { CategoriesPersistenceModule } from "./categories/categorie-persistence.module";
import { CategoriesRepositoryPersistence } from "./categories/categories-repository-persistence";

export {
  AuthRepositoryPersistence,
  AuthRepositoryModule,
  MovieRepositoryModule,
  MovieRepositoryPersistence,
  CategoriesPersistenceModule,
  CategoriesRepositoryPersistence,
};
