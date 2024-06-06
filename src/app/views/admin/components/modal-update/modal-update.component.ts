import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';
import {
  MovieEntity,
  MovieService,
} from '../../../../shared/utils/config/client';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-modal-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-update.component.html',
  styleUrl: './modal-update.component.scss',
})
export class ModalUpdateComponent implements AfterViewInit {
  private readonly movieService = inject(MovieService);
  private formNonNullable = inject(NonNullableFormBuilder);

  @Output() isHidden: EventEmitter<WritableSignal<boolean>> =
    new EventEmitter();
  @Input() isVisible: WritableSignal<boolean> = signal(false);

  idMovie = input<MovieEntity>();

  updateFormMovie: FormGroup = this.formNonNullable.group({
    titleControl: [
      '',
      {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.max(40),
          Validators.min(4),
        ],
      },
    ],
    posterControl: [
      '',
      {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.max(255),
          Validators.min(4),
        ],
      },
    ],
    directorControl: [
      '',
      {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.max(40),
          Validators.min(4),
        ],
      },
    ],
  });

  ngAfterViewInit(): void {
    console.log(this.idMovie());
  }

  closeModal() {
    console.log(this.idMovie());
    this.isVisible.set(!this.isVisible());
    this.isHidden.emit(this.isVisible);
  }

  onSubmit() {
    console.log('test');
  }
}
