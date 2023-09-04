import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorFuenteFinanciamientoComponent } from './buscador-fuente-financiamiento.component';

describe('BuscadorFuenteFinanciamientoComponent', () => {
  let component: BuscadorFuenteFinanciamientoComponent;
  let fixture: ComponentFixture<BuscadorFuenteFinanciamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorFuenteFinanciamientoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorFuenteFinanciamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
