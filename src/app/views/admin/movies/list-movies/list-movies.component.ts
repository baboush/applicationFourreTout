import { Component, Signal, ViewChild, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Categories, MovieEntity, MovieService } from '@core/http';
import { switchMap, map, interval } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  DirectorMovie,
  PosterMovie,
  TitleMovie,
} from '../../../../shared/types/movie-types';
import { ModalDeleteComponent, ModalUpdateComponent, ModalUpdateCategoryComponent } from '@view/admin/components';
import { CategoriesEntity } from '../../../../core/interfaces/categories-entity';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { CustomPaginationConfig } from '../../../../shared/classes/CustomPaginationConfig';

export interface Movie {
  readonly id: number;
  readonly title: TitleMovie;
  readonly director: DirectorMovie;
  readonly poster: PosterMovie;
  readonly categories: Categories[];
}

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
export class ListMoviesComponent {
  private readonly movieService = inject(MovieService);
  private readonly formBuilder = inject(FormBuilder);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;


  modalDeleteIsVisible = signal(false);
  modalUpdateIsVisible = signal(false);
  modalCategoryIsVisible = signal(false);
  idMovie: number = 0;
  movie!: Partial<Movie>;
  categoriesMovie!: CategoriesEntity;

  displayColumns: string[] = ['title', 'director', 'manage'];
  moviesList = new MatTableDataSource<MovieEntity>();


  formMovie: FormGroup = this.formBuilder.group({
    title: new FormControl(''),
    director: new FormControl(''),
    poster: new FormControl(''),
  });

  allMovies: Signal<MovieEntity[]> = toSignal(
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

  deleteModal(id: number) {
    this.modalDeleteIsVisible.set(true);
    this.idMovie = id;
  }

  updateModal(movie: Movie) {
    const { id, title, director, poster, categories } = { ...movie };

    this.modalUpdateIsVisible.set(true);
    this.movie = {
      id,
      title,
      director,
      poster,
      categories,
    };
  }

  categoriesModal(movie: Movie) {
    const {id, categories} = { ...movie };
    this.modalCategoryIsVisible.set(true);
    this.categoriesMovie = {
      id,
      categories,
    };
  }

  searchMovie(event: Event) {
    const filterMovie = (event.target as HTMLInputElement).value;
    this.moviesList.filter = filterMovie.trim().toLowerCase();

    if(this.moviesList.paginator) {
      this.moviesList.paginator.firstPage();
    }
  }
}
