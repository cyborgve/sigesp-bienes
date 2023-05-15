import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPropositoSemovienteComponent } from './tabla-proposito-semoviente.component';

describe('TablaPropositoSemovienteComponent', () => {
  let component: TablaPropositoSemovienteComponent;
  let fixture: ComponentFixture<TablaPropositoSemovienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaPropositoSemovienteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPropositoSemovienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
