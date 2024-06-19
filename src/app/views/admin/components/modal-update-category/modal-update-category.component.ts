import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
  model,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Categories, CategoriesService } from '@core/http';
import { catchError, of, tap } from 'rxjs';
import { Snackbar } from '../../../../shared/classes/snackbar';

export interface CategoriesExist {
  readonly id: number;
  readonly name: string;
  readonly checked: boolean;
}

export interface CategoriesEntity {
  readonly id: number;
  readonly categories: Categories[];
}

@Component({
  selector: 'app-modal-update-category',
  standalone: true,
  imports: [ReactiveFormsModule, MatSlideToggleModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal-update-category.component.html',
  styleUrl: './modal-update-category.component.scss',
})
export class ModalUpdateCategoryComponent {
  /**
  * @property isVisible - A model that represents the visibility state of the component. Default is false.
  */
  isVisible = model(false);

  /**
  *@property checked - A boolean that represents the checked state of the component. Default is false.
  */
  checked = false;

  /**
  * @property entity - A model that represents the entity associated with the category. Default is an object with an id of 0 and an empty categories array.
  */
  entity = model<CategoriesEntity>({ id: 0, categories: [] });

  /**
  * @property categoriesExist - An array that holds the existing categories. Default is an empty array.
  */
  categoriesExist: CategoriesExist[] = [];

  /**
  * @property categoryService - An instance of the CategoriesService.
  * This service provides methods for handling operations related to categories.
  */
  private readonly categoryService = inject(CategoriesService);

  /**
  * @property snackBar - An instance of the Snackbar service.
  * This service provides methods for showing snack bar notifications.
  */
  private readonly snackBar = inject(Snackbar);


  /**
  * @property categories - A Signal that emits an array of Categories.
  *
  * This property is initialized with a Signal that emits the result of the 'categoriesApplicationControllerHandleFindAllCategorySaved' method from the 'categoryService'.
  * The 'pipe' method is used to apply the 'tap' operator to the Observable returned by 'categoriesApplicationControllerHandleFindAllCategorySaved'.
  * The 'tap' operator calls the 'checkCategoriesIsExist' method with the emitted categories as argument.
  * The 'checkCategoriesIsExist' method checks if the categories exist in the entity's categories and updates the 'categoriesExist' property accordingly.
  * The 'toSignal' function is used to convert the Observable to a Signal, with an initial value of an empty array of Categories.
  */
  categories: Signal<Categories[]> = toSignal(
    this.categoryService
      .categoriesApplicationControllerHandleFindAllCategorySaved()
      .pipe(
        tap((category) => this.checkCategoriesIsExist(category)),
      ),
    { initialValue: [] as Categories[] },
  );

  /**
  * Checks if the provided categories exist in the entity's categories.
  *
  * @param {Categories[]} categories - The categories to check.
  *
  * This method maps over the provided categories and for each category, it checks if it exists in the entity's categories.
  * It does this by checking if the 'name' property of the category matches the 'name' property of any category in the entity's categories.
  * It then returns a new array of categories, where each category is extended with a 'checked' property.
  * The 'checked' property is true if the category exists in the entity's categories, and false otherwise.
  */
  checkCategoriesIsExist = (categories: Categories[]) => {
    this.categoriesExist = categories.map((category: Categories) => {
      const isChecked = this.entity().categories?.some(
        (categoryEntity) => categoryEntity.name === category.name,
      );
      return {...category, checked: isChecked};
    });
  };

  /**
  * Adds or removes a category relation with an entity based on the event checked state.
  *
  * @param {any} event - The event object, which contains a 'checked' property.
  * @param {number} idCategory - The ID of the category.
  *
  * If the 'checked' property of the event object is true, it calls the 'addRelationCategoryWithEntity' method.
  * Otherwise, it calls the 'removeRelationCategoryWithEntity' method.
  * Both methods are called with 'idCategory' and the ID of the current entity as arguments.
  */
  addOrRemoveCategory(event: any, idCategory: number) {
    if (event.checked) {
      this.addRelationCategoryWithEntity(idCategory, Number(this.entity().id));
    } else {
      this.removeRelationCategoryWithEntity(idCategory, Number(this.entity().id));
    }
  }


  /**
   * This method is used to add a relation between a category and a movie.
   * It makes a request to the categoriesApplicationControllerHandleAddCategoryToMovieRelation service,
   * passing the id of the category and the id of the movie as parameters.
   * If the request is successful, it shows a success message.
   * If the request fails, it shows an error message.
   *
   * @param {number} idCategory - The id of the category to be related to the movie.
   * @param {number} idMovie - The id of the movie to be related to the category.
  */
  addRelationCategoryWithEntity(idCategory: number, idMovie: number) {
    this.categoryService
      .categoriesApplicationControllerHandleAddCategoryToMovieRelation(
        idCategory,
        idMovie,
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

  /**
  * Removes the relation between a category and a movie.
  *
  * @param {number} idCategory - The ID of the category.
  * @param {number} idMovie - The ID of the movie.
  *
  * This method calls the 'categoriesApplicationControllerHandleRemoveCategoryMovieSaved' method from the 'categoryService'.
  * If the operation is successful, it shows a success message using the 'snackBar' service.
  * If an error occurs, it shows an error message using the 'snackBar' service and returns an Observable of null.
  */
  removeRelationCategoryWithEntity(idCategory: number, idMovie: number) {
    this.categoryService
      .categoriesApplicationControllerHandleRemoveCategoryMovieSaved(
        idCategory,
        idMovie,
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
