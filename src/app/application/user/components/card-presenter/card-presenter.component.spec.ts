import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPresenterComponent } from './card-presenter.component';

describe('CardPresenterComponent', () => {
  let component: CardPresenterComponent;
  let fixture: ComponentFixture<CardPresenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPresenterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
