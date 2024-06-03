import {
  Component,
  OnInit,
  Signal,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardPresenterComponent } from '../../components/card-presenter/card-presenter.component';
import {
  MovieEntity,
  MovieService,
} from '../../../../shared/utils/config/client';
import { fromEvent, interval, map, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [CardPresenterComponent, AsyncPipe],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss',
})
export class MoviePageComponent {
  private readonly movieService = inject(MovieService);

  movies: Signal<MovieEntity[]> = toSignal(
    interval(1000).pipe(
      switchMap(() =>
        this.movieService.movieApplicationControllerHandleFindSavedMoviesList(),
      ),
      map((res) => {
        return [...res]
          .sort((a, b) => {
            return (
              new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
            );
          })
          .reverse()
          .slice(0, 20);
      }),
    ),
    { initialValue: [] as MovieEntity[] },
  );

  constructor() {}
}
