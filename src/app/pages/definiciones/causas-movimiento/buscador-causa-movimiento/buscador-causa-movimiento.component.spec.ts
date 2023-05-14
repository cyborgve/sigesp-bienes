import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCausaMovimientoComponent } from './buscador-causa-movimiento.component';

describe('BuscadorCausaMovimientoComponent', () => {
  let component: BuscadorCausaMovimientoComponent;
  let fixture: ComponentFixture<BuscadorCausaMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorCausaMovimientoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorCausaMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
