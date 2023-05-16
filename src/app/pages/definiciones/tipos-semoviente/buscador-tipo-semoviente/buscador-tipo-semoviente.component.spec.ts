import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorTipoSemovienteComponent } from './buscador-tipo-semoviente.component';

describe('BuscadorTipoSemovienteComponent', () => {
  let component: BuscadorTipoSemovienteComponent;
  let fixture: ComponentFixture<BuscadorTipoSemovienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorTipoSemovienteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorTipoSemovienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
