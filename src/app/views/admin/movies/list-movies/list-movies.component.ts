import { Component, Signal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  MovieEntity,
  MovieService,
} from '../../../../shared/utils/config/client';
import { switchMap, map, interval } from 'rxjs';
import { ModalDeleteComponent } from '../../components/modal-delete/modal-delete.component';
import { ModalUpdateComponent } from '../../components/modal-update/modal-update.component';

@Component({
  selector: 'app-list-movies',
  standalone: true,
  imports: [ModalDeleteComponent, ModalUpdateComponent],
  templateUrl: './list-movies.component.html',
  styleUrl: './list-movies.component.scss',
})
export class ListMoviesComponent {
  private readonly movieService = inject(MovieService);
  modalDeleteIsVisible = signal(false);
  modalUpdateIsVisible = signal(false);
  idMovie: number = 0;
  movie!: MovieEntity;

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
    this.movie = movie;
  }
}
