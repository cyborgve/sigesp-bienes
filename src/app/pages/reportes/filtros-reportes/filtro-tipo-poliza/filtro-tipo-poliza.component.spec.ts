import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTipoPolizaComponent } from './filtro-tipo-poliza.component';

describe('FiltroTipoPolizaComponent', () => {
  let component: FiltroTipoPolizaComponent;
  let fixture: ComponentFixture<FiltroTipoPolizaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroTipoPolizaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroTipoPolizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
