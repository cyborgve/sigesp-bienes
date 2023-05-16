import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTipoSedeComponent } from './tabla-tipo-sede.component';

describe('TablaTipoSedeComponent', () => {
  let component: TablaTipoSedeComponent;
  let fixture: ComponentFixture<TablaTipoSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaTipoSedeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaTipoSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
