import { Component, inject, input, model } from '@angular/core';
import { MovieService } from '../../../../shared/utils/config/client';

@Component({
  selector: 'app-modal-delete',
  standalone: true,
  imports: [],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.scss',
})
export class ModalDeleteComponent {
  private readonly movieService = inject(MovieService);

  idMovie = input(0);
  isVisible = model(false);

  removeItem() {
    this.movieService
      .movieApplicationControllerHandleDeleteSavedMovie(this.idMovie())
      .subscribe(() => {
        console.log('supression');
      });
  }

  closeModal() {
    this.isVisible.set(false);
  }
}
