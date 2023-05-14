import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCausasMovimientoComponent } from './tabla-causa-movimiento.component';

describe('TablaCausasMovimientoComponent', () => {
  let component: TablaCausasMovimientoComponent;
  let fixture: ComponentFixture<TablaCausasMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaCausasMovimientoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCausasMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
