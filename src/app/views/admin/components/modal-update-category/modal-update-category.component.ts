import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
  model,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Categories, CategoriesService } from '@core/http';
import { catchError, interval, map, of, pipe, switchMap, tap } from 'rxjs';
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
  isVisible = model(false);
  checked = false;
  entity = model<CategoriesEntity>({ id: 0, categories: [] });
  categoriesExist: CategoriesExist[] = [];

  private readonly categoryService = inject(CategoriesService);
  private readonly snackBar = inject(Snackbar);

  categories: Signal<Categories[]> = toSignal(
    this.categoryService
      .categoriesApplicationControllerHandleFindAllCategorySaved()
      .pipe(
        map((category) => {
          this.checkCategoriesIsExist(category);
          return [...category];
        }),
      ),
    { initialValue: [] as Categories[] },
  );

  checkCategoriesIsExist = (categories: Categories[]) => {
    return categories.map((category: Categories) => {
      const isExist = this.entity().categories?.find(
        (categoryMovie) => categoryMovie.name === category.name,
      );
      if (!!isExist)
        this.categoriesExist = [
          ...this.categoriesExist,
          { ...category, checked: true },
        ];
      else
        this.categoriesExist = [
          ...this.categoriesExist,
          { ...category, checked: false },
        ];
    });
  };

  addOrRemoveCategory(event: any, idCategory: number) {
    if (event.checked) {
      this.addRelationCategoryWithEntity(idCategory, +this.entity().id);
    }
  }

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
}
