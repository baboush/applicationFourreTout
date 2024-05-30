import { Component } from '@angular/core';
import {
  FooterComponent,
  PriceCardComponent,
  ToolbarComponent,
} from '@application/public/components';
import { Card } from '../../../../shared/interfaces/card';

@Component({
  selector: 'app-prices-page',
  standalone: true,
  imports: [PriceCardComponent, ToolbarComponent, FooterComponent],
  templateUrl: './prices-page.component.html',
  styleUrl: './prices-page.component.scss',
})
export class PricesPageComponent {
  readonly free: Card[] = [
    {
      title: 'Gratuit',
      specs: [
        { name: 'Gestion Tache', valid: true },
        { name: 'Gestion Rendez-vous', valid: true },
        { name: 'Gestion Films', valid: false },
        { name: 'Gestion Books', valid: false },
        { name: 'Accès en anticipè', valid: false },
        { name: 'Assistance', valid: false },
      ],
    },
  ];

  readonly premium: Card[] = [
    {
      title: 'Premium',
      specs: [
        { name: 'Gestion Tache', valid: true },
        { name: 'Gestion Rendez-vous', valid: true },
        { name: 'Gestion Films', valid: true },
        { name: 'Gestion Books', valid: true },
        { name: 'Accès en anticipè', valid: false },
        { name: 'Assistance', valid: false },
      ],
    },
  ];
  readonly premiumMore: Card[] = [
    {
      title: 'Premium +',
      specs: [
        { name: 'Gestion Tache', valid: true },
        { name: 'Gestion Rendez-vous', valid: true },
        { name: 'Gestion Films', valid: true },
        { name: 'Gestion Books', valid: true },
        { name: 'Accès en anticipè', valid: true },
        { name: 'Assistance', valid: true },
      ],
    },
  ];
}
