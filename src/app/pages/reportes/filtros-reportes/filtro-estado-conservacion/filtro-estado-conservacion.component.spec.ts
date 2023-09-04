import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroEstadoConservacionComponent } from './filtro-estado-conservacion.component';

describe('FiltroEstadoConservacionComponent', () => {
  let component: FiltroEstadoConservacionComponent;
  let fixture: ComponentFixture<FiltroEstadoConservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroEstadoConservacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroEstadoConservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
