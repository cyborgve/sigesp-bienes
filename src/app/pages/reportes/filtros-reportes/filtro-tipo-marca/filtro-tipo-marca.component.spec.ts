import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTipoMarcaComponent } from './filtro-tipo-marca.component';

describe('FiltroTipoMarcaComponent', () => {
  let component: FiltroTipoMarcaComponent;
  let fixture: ComponentFixture<FiltroTipoMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroTipoMarcaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroTipoMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
