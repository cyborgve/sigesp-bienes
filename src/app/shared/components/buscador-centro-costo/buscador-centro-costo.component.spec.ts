import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCentroCostoComponent } from './buscador-centro-costo.component';

describe('BuscadorCentroCostoComponent', () => {
  let component: BuscadorCentroCostoComponent;
  let fixture: ComponentFixture<BuscadorCentroCostoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorCentroCostoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
