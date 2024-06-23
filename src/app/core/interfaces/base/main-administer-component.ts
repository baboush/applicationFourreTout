import { Signal } from "@angular/core";
import { CategoriesChecked } from "../categories-checked";
import { BaseMainComponent } from "./base-main-component";

export interface MainAdministerComponent<T> extends BaseMainComponent<T> {

  categories: Signal<CategoriesChecked[]>;
  showModalCategories: (data: CategoriesChecked[]) => CategoriesChecked[];
}
