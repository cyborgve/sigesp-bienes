import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTipoSemovienteComponent } from './filtro-tipo-semoviente.component';

describe('FiltroTipoSemovienteComponent', () => {
  let component: FiltroTipoSemovienteComponent;
  let fixture: ComponentFixture<FiltroTipoSemovienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroTipoSemovienteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroTipoSemovienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
