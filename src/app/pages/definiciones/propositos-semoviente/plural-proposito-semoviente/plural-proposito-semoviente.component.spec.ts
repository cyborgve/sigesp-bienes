import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralPropositoSemovienteComponent } from './plural-proposito-semoviente.component';

describe('PluralPropositoSemovienteComponent', () => {
  let component: PluralPropositoSemovienteComponent;
  let fixture: ComponentFixture<PluralPropositoSemovienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralPropositoSemovienteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralPropositoSemovienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
