import { Component } from '@angular/core';
import {
  CardImageComponent,
  FooterComponent,
  FormContactComponent,
  HeroHeaderComponent,
  ParagrapheComponent,
  ToolbarComponent,
} from '@application/public/components';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ToolbarComponent,
    ParagrapheComponent,
    CardImageComponent,
    FormContactComponent,
    FooterComponent,
    HeroHeaderComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  presentation = {
    title: 'Votre gestionnaire tout-en-un pour la vie quotidienne',
    paragraphe:
      'Bienvenue sur Application Fourre Tout. Cette application est un outil polyvalent qui peut être utilisé à diverses fins, notamment pour gérer vos films et livres, ajouter des favoris, organiser des tâches et planifier des rendez-vous.',
  };
}
