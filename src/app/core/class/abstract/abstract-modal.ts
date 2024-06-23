import { Directive, signal } from "@angular/core";

@Directive()
export abstract class AbstractModal {

  isVisible = signal(false);

  showModal = () => {
    this.isVisible.set(true);
  }

  hideModal = () => {
    this.isVisible.set(false);
  }
}
