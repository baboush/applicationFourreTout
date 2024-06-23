import { Injectable, Signal, inject, signal } from '@angular/core';
import { Movie } from '../../core/interfaces/movie';
import { AbstractEntityComponent } from '../../core/class/abstract/abstract-entity-component';
import { MovieService } from '../../core/http/api/movie.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, interval, switchMap } from 'rxjs';
import { MovieEntity } from '../../core/http/model/movieEntity';

@Injectable({
  providedIn: 'root'
})
export class MovieAdministerService extends AbstractEntityComponent<Movie>{

  private readonly movieDataService = inject(MovieService)

  constructor() {
    super();
  }


  showModalCreate(): void {
    console.log('showModalCreate');
  }

  showModalCategories(data: Movie): void {
    console.log('showModalCategories');
  }

  showModalUpdate(data: Movie, isVisible:Signal<boolean>){

  }

  showModalDelete(id: number): void {
    console.log('showModalDeleteMovie');
  }

  deleteMovie(id: number): Observable<boolean> {
    return this.movieDataService.movieApplicationControllerHandleDeleteSavedMovie(id);
  }
}
