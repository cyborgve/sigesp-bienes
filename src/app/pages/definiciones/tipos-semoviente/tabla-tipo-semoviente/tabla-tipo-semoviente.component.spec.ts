import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTipoSemovienteComponent } from './tabla-tipo-semoviente.component';

describe('TablaTipoSemovienteComponent', () => {
  let component: TablaTipoSemovienteComponent;
  let fixture: ComponentFixture<TablaTipoSemovienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaTipoSemovienteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaTipoSemovienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
