import { Injectable, inject } from '@angular/core';
import { CategoriesService } from '../../../core/http/api/categories.service';
import { CategoryAdministerService } from '../../../core/interfaces/services';
import { catchError, of, tap } from 'rxjs';
import { Snackbar } from '../../../shared/classes/snackbar';

@Injectable({
  providedIn: 'root'
})
export class CategoryAdministerImpService implements CategoryAdministerService{
  private readonly categoryService = inject(CategoriesService);
  private readonly snackBar = inject(Snackbar);

  findCategories() {
    this.categoryService.categoriesApplicationControllerHandleFindAllCategorySaved().subscribe();
  }

  addCategoryRelationMovie(idCategory: number, idMovie: number):void {
    const idCategoryAdd = idCategory;
    const idMovieAdd = idMovie;

    this.categoryService
      .categoriesApplicationControllerHandleAddCategoryToMovieRelation(
        idCategoryAdd,
        idMovieAdd,
      )
      .pipe(
        tap(() =>
          this.snackBar.showSuccessSnackBar(
            'Votre catègorie a bien ètè ajoutè',
          ),
        ),
        catchError((error: any) => {
          this.snackBar.showErrorSnackBar(
            "Une erreur est survenue lors de l'ajout de la catègorie",
          );
          return of(null);
        }),
      )
      .subscribe();
  }

  removeCategoryRelationMovie(idCategory: number, idMovie: number):void {
    const idCategoryAdd = idCategory;
    const idMovieAdd = idMovie;

    this.categoryService
      .categoriesApplicationControllerHandleRemoveCategoryMovieSaved(
        idCategoryAdd,
        idMovieAdd,
      )
      .pipe(
        tap(() =>
          this.snackBar.showSuccessSnackBar(
            'Votre catègorie a bien ètè supprimè',
          ),
        ),
        catchError((error: any) => {
          this.snackBar.showErrorSnackBar(
            "Une erreur est survenue lors de la suppression de la catègorie",
          );
          return of(null);
        }),
      )
      .subscribe();
  }
}
