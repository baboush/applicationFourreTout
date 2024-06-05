import {
  Component,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
  inject,
  input,
  signal,
} from '@angular/core';
import { MovieService } from '../../../../shared/utils/config/client';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  DirectorMovie,
  PosterMovie,
  TitleMovie,
} from '../../../../shared/types/movie-types';

@Component({
  selector: 'app-modal-update',
  standalone: true,
  imports: [],
  templateUrl: './modal-update.component.html',
  styleUrl: './modal-update.component.scss',
})
export class ModalUpdateComponent {
  private readonly = inject(MovieService);
  private formUpdate = inject(FormBuilder);

  idMovie = input(0);
  @Input() isVisible: WritableSignal<boolean> = signal(false);
  @Output() isHidden: EventEmitter<WritableSignal<boolean>> =
    new EventEmitter();

  titleControl = new FormControl<TitleMovie>('', {
    updateOn: 'blur',
    validators: [Validators.required, Validators.max(40), Validators.min(4)],
  });

  posterControl = new FormControl<PosterMovie>('', {
    updateOn: 'blur',
    validators: [Validators.required, Validators.max(255), Validators.min(4)],
  });

  directorControl = new FormControl<DirectorMovie>('', {
    updateOn: 'blur',
    validators: [Validators.required, Validators.max(40), Validators.min(4)],
  });

  closeModal() {
    console.log(this.idMovie());
    this.isVisible.set(!this.isVisible());
    this.isHidden.emit(this.isVisible);
  }
}
