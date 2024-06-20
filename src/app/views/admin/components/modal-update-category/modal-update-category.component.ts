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
import { MatButtonModule } from '@angular/material/button';
import { Categories, CategoriesService } from '@core/http';
import { tap } from 'rxjs';
import { CategoriesEntity, CategoriesChecked } from '@core/interfaces';
import { CategoryAdministerImpService } from '../../services';


@Component({
  selector: 'app-modal-update-category',
  standalone: true,
  imports: [ReactiveFormsModule, MatSlideToggleModule, FormsModule, MatButtonModule],
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
  * @property entity - A model that represents the entity associated with the category. Default is an object with an id of 0 and an empty categories array.
  */
  entity = model<CategoriesEntity>({ id: 0, categories: [] });

  /**
  * @property categoriesExist - An array that holds the existing categories. Default is an empty array.
  */
  categoriesExist: CategoriesChecked[] = [];

  /**
  * @property categoryService - An instance of the CategoriesService.
  * This service provides methods for handling operations related to categories.
  */
  private readonly categoryService = inject(CategoriesService);
  private readonly categoriesAdministerService = inject(CategoryAdministerImpService);

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
  checkCategoriesIsExist = (data: Categories[]) => {
    const categories = [...data];
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
  addOrRemoveCategory(event: any, id: number) {
    const idCategory = id;
    const checked = event.checked;
    if (!!checked) {
      this.categoriesAdministerService.addCategoryRelationMovie(idCategory, Number(this.entity().id));
    } else {
      this.categoriesAdministerService.removeCategoryRelationMovie(idCategory, Number(this.entity().id));
    }
  }


  addRelationCategoryWithEntity(idCategory: number, idMovie: number) {
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
  }


  /**
  * Close modal category
  */
  closeModal() {
    this.isVisible.set(false);
  }
}
