import { Component, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CategoriesService, MovieEntity, MovieService } from '@core/http';
import { CategoriesEntity, UpdateCategory } from '@core/interfaces/categories';
import { MainAdministerMovieComponent, Movie } from '@core/interfaces/movies';
import { CustomPaginationConfig, Snackbar } from '@shared/classes';
import { ModalDeleteComponent, ModalUpdateCategoryComponent, ModalUpdateComponent } from '@view/admin/components';
import { Subject, catchError, interval, map, of, switchMap, takeUntil, } from 'rxjs';

@Component({
  selector: 'app-list-movies',
  standalone: true,
  imports: [
    ModalDeleteComponent,
    ModalUpdateComponent,
    ModalUpdateCategoryComponent,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatSort,
    MatPaginatorModule,
    MatInputModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginationConfig }],
  templateUrl: './list-movies.component.html',
  styleUrl: './list-movies.component.scss',
})
export class ListMoviesComponent implements MainAdministerMovieComponent, OnDestroy {
  private readonly movieService = inject(MovieService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly snackBar = inject(Snackbar);
  private destroy$ = new Subject<void>();

  categories = signal<CategoriesEntity>({} as CategoriesEntity);
  modalCreateIsVisible = signal(false);
  modalUpdateIsVisible = signal(false);
  modalDeleteIsVisible = signal(false);
  modalCategoriesIsVisible = signal(false);
  movie = signal<Partial<Movie>>({} as Movie);
  movieId = signal(0);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  isVisible = signal(false)


  displayColumns: string[] = ['title', 'director', 'manage'];
  moviesList = new MatTableDataSource<MovieEntity>();

  movies = toSignal(
    interval(1000).pipe(
      switchMap(() =>
        this.movieService.movieApplicationControllerHandleFindSavedMoviesList(),
      ),
      map((movie) => {
        this.moviesList.paginator = this.paginator;
        this.moviesList.sort = this.sort;
        return this.moviesList.data = movie;
      }),
    ),
    { initialValue: [] as MovieEntity[] },
  );

  formGroup = this.formBuilder.group({
    title: new FormControl(''),
    director: new FormControl(''),
    poster: new FormControl(''),
  });

  searchMovie(event: Event) {
    const filterMovie = (event.target as HTMLInputElement).value;
    this.moviesList.filter = filterMovie.trim().toLowerCase();

    if(this.moviesList.paginator) {
      this.moviesList.paginator.firstPage();
    }
  }

  showModalCreate = () => {
    console.log('showModalCreate');
  }

  showModalDelete = (id:number) => {
    this.modalDeleteIsVisible.set(true);
    this.movieId.set(id);
  }

  deleteMovie = (confirmDelete: boolean) => {
    if(!!confirmDelete)
    this.movieService
      .movieApplicationControllerHandleDeleteSavedMovie(this.movieId())
      .pipe(
        takeUntil(this.destroy$),
        catchError(() => {
          this.snackBar.showErrorSnackBar(`Une erreur est survenue lors de la suppression du film`)
          return of(null);
        }),
      )
      .subscribe({
        next: () => this.snackBar.showSuccessSnackBar(`Le film a bien été supprimé`)
      });
  }

  showModalUpdate = (movie: Partial<Movie>) => {
    this.modalUpdateIsVisible.set(true);
    this.movie.set({
      id: movie.id,
      title: movie.title,
      director: movie.director,
      poster: movie.poster
    });
    this.formGroup.patchValue(movie);
  };

  updateMovie = (movie:Movie) => {
    this.movieService
      .movieApplicationControllerHandleUpdateMovieDetail(movie)
      .pipe(
        takeUntil(this.destroy$),
        catchError(() => {
          this.snackBar.showErrorSnackBar(`Une erreur est survenue lors de la modification du film`)
          return of(null);
        })
      )
      .subscribe({
        next: () => this.snackBar.showSuccessSnackBar(`Le film a bien été modifié`),
      });
  }

  showModalCategories(categoriesMovie: CategoriesEntity) {
    this.modalCategoriesIsVisible.set(true);
    this.movieId.set(categoriesMovie.id)
    this.categories.set(categoriesMovie);
  }

  updateCategoryMovie = (category:UpdateCategory) => {
    const errorMessage = `Une erreur est survenue lors de  ${category.checked ? 'l\'ajout de la catègorie' : 'la suppression de la catégorie'}`;
    const successMessage = `La catégorie a bien été ${category.checked ? 'ajoutée' : 'supprimée'}`;
    const updateCategory$ =
      category.checked
        ? this.categoriesService.categoriesApplicationControllerHandleAddCategoryToMovieRelation(category.id, this.movieId())
        : this.categoriesService.categoriesApplicationControllerHandleRemoveCategoryMovieSaved(category.id, this.movieId());

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
}
