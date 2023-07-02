import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorFuenteFinanciemientoComponent } from './buscador-fuente-financiemiento.component';

describe('BuscadorFuenteFinanciemientoComponent', () => {
  let component: BuscadorFuenteFinanciemientoComponent;
  let fixture: ComponentFixture<BuscadorFuenteFinanciemientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorFuenteFinanciemientoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorFuenteFinanciemientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
