import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasContablesProcesoComponent } from './cuentas-contables-proceso.component';

describe('CuentasContablesProcesoComponent', () => {
  let component: CuentasContablesProcesoComponent;
  let fixture: ComponentFixture<CuentasContablesProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CuentasContablesProcesoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentasContablesProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
