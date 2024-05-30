import { Component, Input } from '@angular/core';
import { Card } from '../../../../shared/interfaces/card';

@Component({
  selector: 'app-price-card',
  standalone: true,
  imports: [],
  templateUrl: './price-card.component.html',
  styleUrl: './price-card.component.scss',
})
export class PriceCardComponent {
  @Input() card?: Card[];
}
