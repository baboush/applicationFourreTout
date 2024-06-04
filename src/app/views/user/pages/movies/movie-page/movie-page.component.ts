import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LatestMovieComponent } from '../components/latest-movie/latest-movie.component';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [LatestMovieComponent],
  templateUrl: './movie-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './movie-page.component.scss',
})
export class MoviePageComponent {}
