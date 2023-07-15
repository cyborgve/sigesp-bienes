import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralEntregaUnidadComponent } from './plural-entrega-unidad.component';

describe('PluralEntregaUnidadComponent', () => {
  let component: PluralEntregaUnidadComponent;
  let fixture: ComponentFixture<PluralEntregaUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralEntregaUnidadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralEntregaUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
