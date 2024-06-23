import { Component, model, output } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  standalone: true,
  imports: [],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.scss',
})
export class ModalDeleteComponent {

  acceptRemoveItem = output<boolean>();
  isVisible = model(false);

  removeItem() {
    this.isVisible.set(false);
    this.acceptRemoveItem.emit(true)
  }

  closeModal() {
    this.isVisible.set(false);
  }
}
