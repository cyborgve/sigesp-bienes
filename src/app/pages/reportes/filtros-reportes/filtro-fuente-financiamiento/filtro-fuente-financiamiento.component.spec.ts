import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroFuenteFinanciamientoComponent } from './filtro-fuente-financiamiento.component';

describe('FiltroFuenteFinanciamientoComponent', () => {
  let component: FiltroFuenteFinanciamientoComponent;
  let fixture: ComponentFixture<FiltroFuenteFinanciamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroFuenteFinanciamientoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroFuenteFinanciamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
