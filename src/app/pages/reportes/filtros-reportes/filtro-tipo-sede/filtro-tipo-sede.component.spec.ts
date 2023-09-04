import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTipoSedeComponent } from './filtro-tipo-sede.component';

describe('FiltroTipoSedeComponent', () => {
  let component: FiltroTipoSedeComponent;
  let fixture: ComponentFixture<FiltroTipoSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroTipoSedeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroTipoSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
