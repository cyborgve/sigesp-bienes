import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorEntregaUnidadComponent } from './buscador-entrega-unidad.component';

describe('BuscadorEntregaUnidadComponent', () => {
  let component: BuscadorEntregaUnidadComponent;
  let fixture: ComponentFixture<BuscadorEntregaUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorEntregaUnidadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorEntregaUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
