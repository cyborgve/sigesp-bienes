import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularEstadoConservacionComponent } from './singular-estado-conservacion.component';

describe('SingularEstadoConservacionComponent', () => {
  let component: SingularEstadoConservacionComponent;
  let fixture: ComponentFixture<SingularEstadoConservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularEstadoConservacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularEstadoConservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
