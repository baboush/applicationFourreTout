import {
    ChangeDetectionStrategy,
    Component,
    Signal,
    inject,
    model,
    output,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Categories, CategoriesService } from '@core/http';
import { CategoryChecked, CategoriesEntity, UpdateCategory } from '@core/interfaces/categories';
import { tap } from 'rxjs';



@Component({
  selector: 'app-modal-update-category',
  standalone: true,
  imports: [ReactiveFormsModule, MatSlideToggleModule, FormsModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal-update-category.component.html',
  styleUrl: './modal-update-category.component.scss',
})
export class ModalUpdateCategoryComponent {

  private readonly categoryService = inject(CategoriesService);

  isVisible = model(false);
  entity = model<CategoriesEntity>({ id: 0, categories: [] });
  categoriesExist: CategoryChecked[] = [];
  checkedOrNotCategory = output<UpdateCategory>();


  categories: Signal<Categories[]> = toSignal(
    this.categoryService
      .categoriesApplicationControllerHandleFindAllCategorySaved()
      .pipe(
        tap((category) => this.checkCategoriesIsExist(category)),
      ),
    { initialValue: [] as Categories[] },
  );


  checkCategoriesIsExist = (categories: Categories[]) => {
    this.categoriesExist = categories.map((category: Categories) => {
      const isChecked = this.entity().categories?.some(
        (categoryEntity) => categoryEntity.name === category.name,
      );

      return {...category, checked: isChecked};
    });
  };

  addOrRemoveCategory = (event: MatSlideToggleChange, id: number) => {
    const updateCategoryData:UpdateCategory = {
      id: id,
      checked: event.checked
    };

    this.checkedOrNotCategory.emit(updateCategoryData);
  }

  closeModal() {
    this.isVisible.set(false);
  }
}
