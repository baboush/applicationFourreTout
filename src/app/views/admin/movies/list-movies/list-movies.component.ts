import { Component, Signal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MovieEntity, MovieService } from '@core/http';
import { switchMap, map, interval } from 'rxjs';
import { ModalDeleteComponent } from '../../components/modal-delete/modal-delete.component';
import { ModalUpdateComponent } from '../../components/modal-update/modal-update.component';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalUpdateCategoryComponent } from '../../components/modal-update-category/modal-update-category.component';

@Component({
  selector: 'app-list-movies',
  standalone: true,
  imports: [
    ModalDeleteComponent,
    ModalUpdateComponent,
    ModalUpdateCategoryComponent,
    MatButtonModule,
  ],
  templateUrl: './list-movies.component.html',
  styleUrl: './list-movies.component.scss',
})
export class ListMoviesComponent {
  private readonly movieService = inject(MovieService);
  private readonly formBuilder = inject(FormBuilder);
  modalDeleteIsVisible = signal(false);
  modalUpdateIsVisible = signal(false);
  modalCategoryIsVisible = signal(false);

  idMovie: number = 0;
  movie!: Partial<MovieEntity>;
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
        return [...movie];
      }),
    ),
    { initialValue: [] as MovieEntity[] },
  );

  deleteModal(id: number) {
    this.modalDeleteIsVisible.set(true);
    this.idMovie = id;
  }

  updateModal(movie: MovieEntity) {
    this.modalUpdateIsVisible.set(true);
    this.movie = {
      id: movie.id,
      title: movie.title,
      director: movie.director,
      poster: movie.poster,
      categories: movie.categories,
    };
  }

  categoriesModal() {
    this.modalCategoryIsVisible.set(true);
  }
}
