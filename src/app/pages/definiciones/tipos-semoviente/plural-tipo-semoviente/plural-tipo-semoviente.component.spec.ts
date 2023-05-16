import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralTipoSemovienteComponent } from './plural-tipo-semoviente.component';

describe('PluralTipoSemovienteComponent', () => {
  let component: PluralTipoSemovienteComponent;
  let fixture: ComponentFixture<PluralTipoSemovienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralTipoSemovienteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralTipoSemovienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
