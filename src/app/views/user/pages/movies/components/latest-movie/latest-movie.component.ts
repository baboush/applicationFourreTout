import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Signal,
  ViewChild,
  inject,
} from '@angular/core';
import {
  MovieEntity,
  MovieService,
} from '../../../../../../shared/utils/config/client';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, map, switchMap } from 'rxjs';
import { CardPresenterComponent } from '../../../../components/card-presenter/card-presenter.component';

@Component({
  selector: 'app-latest-movie',
  standalone: true,
  imports: [CardPresenterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './latest-movie.component.html',
  styleUrl: './latest-movie.component.scss',
})
export class LatestMovieComponent {
  private readonly movieService = inject(MovieService);
  @ViewChild('scrollContent')
  scrollContent!: ElementRef;

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

  next() {
    this.scrollContent.nativeElement.scrollLeft += 500;
  }

  prev() {
    this.scrollContent.nativeElement.scrollLeft -= 500;
  }
}
