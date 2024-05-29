import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Email, Name } from '@shared/types';

@Component({
  selector: 'app-form-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-contact.component.html',
  styleUrl: './form-contact.component.scss',
})
export class FormContactComponent {
  private formBuilder = inject(FormBuilder);
  nameCheck = new FormControl<Name>('', {
    updateOn: 'change',
    validators: [
      Validators.minLength(3),
      Validators.maxLength(40),
      Validators.required,
      Validators.pattern('[a-zA-Z]+$'),
    ],
  });
  emailCheck = new FormControl<Email>('', {
    updateOn: 'change',
    validators: [Validators.required, Validators.email],
  });
  messageCheck = new FormControl<string>('', {
    updateOn: 'change',
    validators: [
      Validators.required,
      Validators.minLength(50),
      Validators.maxLength(400),
    ],
  });

  form = this.formBuilder.group({
    name: this.nameCheck,
    email: this.emailCheck,
    message: this.messageCheck,
  });
}
