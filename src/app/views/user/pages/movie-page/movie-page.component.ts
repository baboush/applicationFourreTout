import {
  AfterViewInit,
  Component,
  ElementRef,
  Signal,
  ViewChild,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardPresenterComponent } from '../../components/card-presenter/card-presenter.component';
import {
  MovieEntity,
  MovieService,
} from '../../../../shared/utils/config/client';
import { interval, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [CardPresenterComponent],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss',
})
export class MoviePageComponent implements AfterViewInit {
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

  constructor() {}
  ngAfterViewInit(): void {}

  next() {
    this.scrollContent.nativeElement.scrollLeft += 500;
  }

  prev() {
    this.scrollContent.nativeElement.scrollLeft -= 500;
  }
}
