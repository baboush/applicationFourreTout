import { Signal } from "@angular/core";
import { FormGroup } from "@angular/forms";

export interface BaseMainComponent <T> {
  formGroup:FormGroup;
  modalCreateIsVisible:Signal<boolean>;
  modalUpdateIsVisible:Signal<boolean>;
  modalDeleteIsVisible:Signal<boolean>;

  showModalCreate: () => void;
  showModalUpdate: (data: T) => void;
  showModalDelete: (id: number) => void;
}
