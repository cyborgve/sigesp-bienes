import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorTipoSedeComponent } from './buscador-tipo-sede.component';

describe('BuscadorTipoSedeComponent', () => {
  let component: BuscadorTipoSedeComponent;
  let fixture: ComponentFixture<BuscadorTipoSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorTipoSedeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorTipoSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
