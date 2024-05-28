import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
//TODO: import parse issue tsconfig language server
import { Email } from '../../../../shared/types/user-type';
import { Name } from '../../../../shared/types/profile-types';

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
    updateOn: 'blur',
    validators: [
      Validators.minLength(3),
      Validators.maxLength(40),
      Validators.required,
      Validators.pattern('[a-zA-Z]+$'),
    ],
  });
  emailCheck = new FormControl<Email>('', [
    Validators.required,
    Validators.email,
  ]);
  messageCheck = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(50),
    Validators.maxLength(400),
  ]);

  form = this.formBuilder.group({
    name: this.nameCheck,
    email: this.emailCheck,
    message: this.messageCheck,
  });
}
