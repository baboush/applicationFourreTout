import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button-action',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './button-action.component.html',
  styleUrl: './button-action.component.scss',
})
export class ButtonActionComponent {
  @Input() title = '';
  @Input() link = '';
}
