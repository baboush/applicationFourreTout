import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-presenter',
  standalone: true,
  imports: [],
  templateUrl: './card-presenter.component.html',
  styleUrl: './card-presenter.component.scss',
})
export class CardPresenterComponent {
  @Input() poster!: string;
}
