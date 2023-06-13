import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCuentaContableComponent } from './tabla-cuenta-contable.component';

describe('TablaCuentaContableComponent', () => {
  let component: TablaCuentaContableComponent;
  let fixture: ComponentFixture<TablaCuentaContableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaCuentaContableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCuentaContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
