import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCausaMovimientoComponent } from './tabla-causa-movimiento.component';

describe('TablaCausaMovimientoComponent', () => {
  let component: TablaCausaMovimientoComponent;
  let fixture: ComponentFixture<TablaCausaMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaCausaMovimientoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCausaMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
