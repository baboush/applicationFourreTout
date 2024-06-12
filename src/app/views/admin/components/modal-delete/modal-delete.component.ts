import { Component, inject, input, model } from '@angular/core';
import { MovieService } from '@core/http';

@Component({
  selector: 'app-modal-delete',
  standalone: true,
  imports: [],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.scss',
})
export class ModalDeleteComponent {
  private readonly movieService = inject(MovieService);

  id = input(0);
  isVisible = model(false);

  removeItem() {
    this.movieService
      .movieApplicationControllerHandleDeleteSavedMovie(this.id())
      .subscribe(() => {
        console.log('supression');
      });
    this.isVisible.set(false);
  }

  closeModal() {
    this.isVisible.set(false);
  }
}
