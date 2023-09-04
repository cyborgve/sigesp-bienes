import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTipoActivoComponent } from './filtro-tipo-activo.component';

describe('FiltroTipoActivoComponent', () => {
  let component: FiltroTipoActivoComponent;
  let fixture: ComponentFixture<FiltroTipoActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroTipoActivoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroTipoActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
