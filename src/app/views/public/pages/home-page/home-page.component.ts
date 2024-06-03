import { Component, inject } from '@angular/core';
import {
  CardImageComponent,
  FooterComponent,
  FormContactComponent,
  HeroHeaderComponent,
  ParagrapheComponent,
  ToolbarComponent,
} from '@view/public/components';
import { MovieService } from '../../../../shared/utils/config/client';

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
  data: MovieService = inject(MovieService);
  presentation = {
    title: 'Votre gestionnaire tout-en-un pour la vie quotidienne',
    paragraphe:
      'Bienvenue sur Application Fourre Tout. Cette application est un outil polyvalent qui peut être utilisé à diverses fins, notamment pour gérer vos films et livres, ajouter des favoris, organiser des tâches et planifier des rendez-vous.',
  };

  addData() {
    for (let i = 0; i < 100; i++) {
      console.log(i);
      this.data
        .movieApplicationControllerHandleCreateAndPublishMovie({
          title: `Il buco + ${i}`,
          director: `Michelangelo Frammartino + ${i}`,
          poster:
            'https://fr.web.img6.acsta.net/c_310_420/pictures/22/04/01/16/37/0325754.jpg',
        })
        .subscribe();
    }
  }
}
