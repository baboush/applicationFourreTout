import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateCategoryComponent } from './modal-update-category.component';

describe('ModalUpdateCategoryComponent', () => {
  let component: ModalUpdateCategoryComponent;
  let fixture: ComponentFixture<ModalUpdateCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUpdateCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalUpdateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
