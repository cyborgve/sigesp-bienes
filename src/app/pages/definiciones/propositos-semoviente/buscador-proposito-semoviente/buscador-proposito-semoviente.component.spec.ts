import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorPropositoSemovienteComponent } from './buscador-proposito-semoviente.component';

describe('BuscadorPropositoSemovienteComponent', () => {
  let component: BuscadorPropositoSemovienteComponent;
  let fixture: ComponentFixture<BuscadorPropositoSemovienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorPropositoSemovienteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorPropositoSemovienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
