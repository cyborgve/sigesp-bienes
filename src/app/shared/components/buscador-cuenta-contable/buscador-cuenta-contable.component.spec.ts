import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCuentaContableComponent } from './buscador-cuenta-contable.component';

describe('BuscadorCuentaContableComponent', () => {
  let component: BuscadorCuentaContableComponent;
  let fixture: ComponentFixture<BuscadorCuentaContableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorCuentaContableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorCuentaContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
