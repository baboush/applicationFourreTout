import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { EmailValidator, FormsModule, NgForm } from '@angular/forms';
import { Email } from '@shared/types';
import { emailSchema } from '@shared/schemas';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements AfterViewInit {
  @ViewChild('newsLetterForm') newsLetterForm!: NgForm;

  email: Email = '';

  constructor() {}

  ngAfterViewInit(): void {}
  onSubmit() {
    emailSchema.parse(!this.newsLetterForm.value);
    if (this.newsLetterForm.invalid) {
      return console.error('Error format');
    }
    console.log(this.newsLetterForm.value);
  }
}
