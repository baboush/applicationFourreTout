import { Directive, ViewChild, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormBuilder } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { CategoriesEntity, UpdateCategory } from "@core/interfaces/categories";
import { Snackbar } from "@shared/classes";
import { Observable, Subject, catchError, interval, map, of, switchMap, takeUntil } from "rxjs";
import { CategoriesService } from "../../http/api/categories.service";

@Directive()
export abstract class AbstractEntityComponent<T> {
  private readonly categoriesService = inject(CategoriesService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly snackBar = inject(Snackbar);
  private destroy$ = new Subject<void>();

  categories = signal<CategoriesEntity>({} as CategoriesEntity);
  entity = signal<Partial<T>>({});
  entityId = signal(0);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSortHeader) sort!: MatSort;


  displayColumns: string[] = this.getDisplayColumns();
  dataSource = new MatTableDataSource<T>();

  entities = toSignal(
    interval(1000).pipe(
      switchMap(() =>
        this.getService().findAll() as Observable<T[]>,
      ),
      map((entity: T[]) => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        return this.dataSource.data = entity;
      }),
    ),
    { initialValue: [] as T[] },
  );


  searchEntities(event: Event) {
    const filterMovie = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterMovie.trim().toLowerCase();

    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showModalCreate = () => {
    console.log('showModalCreate');
  }

  deleteMovie = (confirmDelete: boolean) => {
    if(!!confirmDelete)
    this.getService()
      .deleteEntity(this.entityId())
      .pipe(
        takeUntil(this.destroy$),
        catchError(() => {
          this.snackBar.showErrorSnackBar(`Une erreur est survenue lors de la suppression`)
          return of(null);
        }),
      )
      .subscribe({
        next: () => this.snackBar.showSuccessSnackBar(`Le film a bien été supprimé`)
      });
  }

  updateMovie = (entity:T) => {
    this.getService()
      .updateEntity(entity)
      .pipe(
        takeUntil(this.destroy$),
        catchError(() => {
          this.snackBar.showErrorSnackBar(`Une erreur est survenue lors de la modification`)
          return of(null);
        })
      )
      .subscribe({
        next: () => this.snackBar.showSuccessSnackBar(`La mise a jour a bien ètè effectuée`)
      });
  }


  updateCategoryMovie = (category:UpdateCategory) => {
    const errorMessage = `Une erreur est survenue lors de  ${category.checked ? 'l\'ajout de la catègorie' : 'la suppression de la catégorie'}`;
    const successMessage = `La catégorie a bien été ${category.checked ? 'ajoutée' : 'supprimée'}`;
    const updateCategory$ =
      category.checked
        ? this.categoriesService.categoriesApplicationControllerHandleAddCategoryToMovieRelation(category.id, this.entityId())
        : this.categoriesService.categoriesApplicationControllerHandleRemoveCategoryMovieSaved(category.id, this.entityId());

    updateCategory$.pipe(
      takeUntil(this.destroy$),
      catchError(() => {
        this.snackBar.showErrorSnackBar(errorMessage);
        return of(null);
      })
    )
      .subscribe({
        next: ()=> this.snackBar.showSuccessSnackBar(successMessage),
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  abstract getService():any;
  abstract getDisplayColumns(): string[];
}
