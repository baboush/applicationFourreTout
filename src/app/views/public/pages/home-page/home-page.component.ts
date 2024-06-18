import { Component, inject } from '@angular/core';
import {
  CardImageComponent,
  FooterComponent,
  FormContactComponent,
  HeroHeaderComponent,
  ParagrapheComponent,
  ToolbarComponent,
} from '@view/public/components';
import { MovieService } from '@core/http';
import { ContactFormData } from '@shared/interfaces';
import {
  emailContactSchema,
  messageContactSchema,
  nameContactSchema,
} from '@shared/schemas';
import { ButtonActionComponent } from '../../components/utility-components/button-action/button-action.component';

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
    ButtonActionComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  data: MovieService = inject(MovieService);

  details = {
    title: 'En savoir plus',
    link: '#',
  };
  presentation = {
    title: 'Votre gestionnaire tout-en-un pour la vie quotidienne',
    paragraphe:
      'Bienvenue sur Application Fourre Tout. Cette application est un outil polyvalent qui peut être utilisé à diverses fins, notamment pour gérer vos films et livres, ajouter des favoris, organiser des tâches et planifier des rendez-vous.',
  };

  submitFormContact(formData: ContactFormData) {
    const data = { ...formData };
    const isValid =
      !nameContactSchema.safeParse(data.name) ||
      !emailContactSchema.safeParse(data.email) ||
      !messageContactSchema.safeParse(data.message) ||
      !data;
    if (!isValid) {
      console.log('error');
    }
    console.log(formData);
  }
}
