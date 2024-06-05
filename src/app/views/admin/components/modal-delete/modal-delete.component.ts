import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  input,
  signal,
} from '@angular/core';
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
  isVisibleSignal = signal(false);
  @Input() set isVisible(value: boolean) {
    this.isVisibleSignal.set(value);
  }
  @Output() isVisibleChange = new EventEmitter();

  removeItem() {
    this.movieService
      .movieApplicationControllerHandleDeleteSavedMovie(this.idMovie())
      .subscribe(() => {
        console.log('supression');
      });
    this.isVisibleChange.emit(!!this.isVisible);
    this.isVisibleSignal.set(false);
  }

  closeModal() {
    this.isVisibleChange.emit(!!this.isVisible);
    this.isVisibleSignal.set(false);
  }
}
