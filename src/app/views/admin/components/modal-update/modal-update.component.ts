import {
  ChangeDetectionStrategy,
  Component,
  Input,
  model,
  input,
  output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalUpdateCategoryComponent } from '@view/admin/components';

@Component({
  selector: 'app-modal-update',
  standalone: true,
  imports: [ReactiveFormsModule, ModalUpdateCategoryComponent],
  templateUrl: './modal-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './modal-update.component.scss',
})
export class ModalUpdateComponent   {
  isVisible = model(false);
  isCategoryVisible = model(false);
  entity = input<any>();
  updateData = output<any>();
  @Input() formGroup!: FormGroup;

  entityProps = () => Object.keys(this.entity()).filter((prop) => {
      return prop !== 'id' && prop !== 'categories';
    }, [] as string[])

  onSubmit() {
    this.updateData.emit({
      ...this.entity(),
      ...this.formGroup.getRawValue(),
    });
    this.isVisible.set(false);
  }

  closeModal() {
    this.isVisible.set(false);
  }
}
