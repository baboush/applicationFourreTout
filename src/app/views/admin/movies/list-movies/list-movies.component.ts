import { Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  MovieEntity,
  MovieService,
} from '../../../../shared/utils/config/client';
import { switchMap, map, interval } from 'rxjs';
import { ModalDeleteComponent } from '../../components/modal-delete/modal-delete.component';

@Component({
  selector: 'app-list-movies',
  standalone: true,
  imports: [ModalDeleteComponent],
  templateUrl: './list-movies.component.html',
  styleUrl: './list-movies.component.scss',
})
export class ListMoviesComponent {
  private readonly movieService = inject(MovieService);
  isVisible = false;
  idMovie: number = 0;

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
    this.isVisible = !this.isVisible;
    this.idMovie = id;
  }
}
