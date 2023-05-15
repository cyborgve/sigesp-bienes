import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralEstadoConservacionComponent } from './plural-estado-conservacion.component';

describe('PluralEstadoConservacionComponent', () => {
  let component: PluralEstadoConservacionComponent;
  let fixture: ComponentFixture<PluralEstadoConservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralEstadoConservacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralEstadoConservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
