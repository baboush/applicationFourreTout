import { Component, Signal, toSignal } from '@angular/core';
import { CardPresenterComponent } from '../../components/card-presenter/card-presenter.component';
import {
  MovieEntity,
  MovieService,
} from '../../../../shared/utils/config/client';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [CardPresenterComponent],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss',
})
export class MoviePageComponent {
  movies: Signal<MovieEntity[]> = toSignal(
    this.movieService.movieApplicationControllerHandleFindSavedMoviesList(),
    {
      initialValue: [] as MovieEntity[],
    },
  );

  constructor(private movieService: MovieService) {}
}
