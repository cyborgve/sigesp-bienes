import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularPropositoSemovienteComponent } from './singular-proposito-semoviente.component';

describe('SingularPropositoSemovienteComponent', () => {
  let component: SingularPropositoSemovienteComponent;
  let fixture: ComponentFixture<SingularPropositoSemovienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularPropositoSemovienteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularPropositoSemovienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
