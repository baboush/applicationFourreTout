export interface CategoryAdministerService {
  addCategoryRelationMovie(idCategory:number, idMovie:number):void;
  removeCategoryRelationMovie(idCategory: number, idMovie: number):void;
  //addCategoryRelationBook(idCategory:number, idBook: number):Observable<CategoriesChecked>;
 // removeCategoryRelationBook(idCategory: number, idBook:number):Observable<CategoriesChecked>;
}
