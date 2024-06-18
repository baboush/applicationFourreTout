import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
  model,
  OnInit,
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
export class ModalUpdateComponent implements OnInit {
  isVisible = model(false);
  isCategoryVisible = model(false);
  entity = input<any>();
  updateData = output<any>();
  @Input() formGroup!: FormGroup;
  entityProps: string[] = [];

  ngOnInit(): void {
    this.entityProps = Object.keys(this.entity()).filter((prop) => {
      return prop !== 'id' && prop !== 'categories';
    });
    this.formGroup.patchValue(this.entity());
  }

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

  addCategories() {
    this.isCategoryVisible.set(true);
  }
}
