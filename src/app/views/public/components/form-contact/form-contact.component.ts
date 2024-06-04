import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactFormData } from '@shared/interfaces';
import { EmailContact, MessageContact, NameContact } from '@shared/types';

@Component({
  selector: 'app-form-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-contact.component.html',
  styleUrl: './form-contact.component.scss',
})
export class FormContactComponent {
  @Output() submitFormContact: EventEmitter<ContactFormData> =
    new EventEmitter<ContactFormData>();

  private formBuilder = inject(FormBuilder);

  nameCheck = new FormControl<NameContact>('', {
    updateOn: 'change',
    validators: [
      Validators.minLength(3),
      Validators.maxLength(40),
      Validators.required,
      Validators.pattern('[a-zA-Z]+$'),
    ],
  });

  emailCheck = new FormControl<EmailContact>('', {
    updateOn: 'change',
    validators: [Validators.required, Validators.email],
  });

  messageCheck = new FormControl<MessageContact>('', {
    updateOn: 'change',
    validators: [
      Validators.required,
      Validators.minLength(50),
      Validators.maxLength(400),
    ],
  });

  form: FormGroup = this.formBuilder.group({
    name: this.nameCheck,
    email: this.emailCheck,
    message: this.messageCheck,
  });

  onSubmit() {
    this.submitFormContact.emit(this.form.getRawValue());
  }
}
