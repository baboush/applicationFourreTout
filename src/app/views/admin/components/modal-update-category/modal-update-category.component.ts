import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  Signal,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Categories, CategoriesService } from '@core/http';
import { interval, map, pipe, switchMap } from 'rxjs';

@Component({
  selector: 'app-modal-update-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal-update-category.component.html',
  styleUrl: './modal-update-category.component.scss',
})
export class ModalUpdateCategoryComponent {
  formCategories: FormGroup = new FormGroup({});
  private readonly categoryService = inject(CategoriesService);

  categories: Signal<Categories[]> = toSignal(
    this.categoryService
      .categoriesApplicationControllerHandleFindAllCategorySaved()
      .pipe(
        map((category) => {
          return [...category];
        }),
      ),
    { initialValue: [] as Categories[] },
  );

  categoriesExist = this.categories().map((category) => {
    return { id: category.id, name: category.name, checked: false };
  });

  formGroup = computed(() => {
    const formControls: any = {};
    this.categoriesExist.map((category) => {
      formControls[category.name] = new FormControl('', Validators.required);
    });
    return new FormGroup(formControls);
  });

  onSubmit() {
    console.log(this.formGroup().getRawValue());
  }
}
