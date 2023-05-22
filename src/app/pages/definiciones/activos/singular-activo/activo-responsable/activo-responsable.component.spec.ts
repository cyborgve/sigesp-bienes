import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivoResponsableComponent } from './activo-responsable.component';

describe('ActivoResponsableComponent', () => {
  let component: ActivoResponsableComponent;
  let fixture: ComponentFixture<ActivoResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivoResponsableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivoResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
