import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  input,
  model,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './modal-update.component.scss',
})
export class ModalUpdateComponent implements OnInit {
  private readonly movieService = inject(MovieService);
  private formNonNullable = inject(NonNullableFormBuilder);

  isVisible = model(false);
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

  ngOnInit(): void {
    this.updateFormMovie.patchValue({
      titleControl: this.idMovie()?.title,
      posterControl: this.idMovie()?.poster,
      directorControl: this.idMovie()?.director,
    });
  }

  closeModal() {
    this.isVisible.set(false);
  }

  onSubmit() {
    console.log(this.updateFormMovie.getRawValue());
  }
}
