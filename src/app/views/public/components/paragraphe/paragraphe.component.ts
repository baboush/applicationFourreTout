import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paragraphe',
  standalone: true,
  imports: [],
  templateUrl: './paragraphe.component.html',
  styleUrl: './paragraphe.component.scss',
})
export class ParagrapheComponent {
  @Input({ required: true }) titleParagraphe: string = 'Salut';
  @Input({ required: true }) paragraphe: string = 'Test';
}
