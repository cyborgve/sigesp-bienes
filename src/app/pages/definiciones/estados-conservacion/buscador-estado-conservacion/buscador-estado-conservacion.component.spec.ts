import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorEstadoConservacionComponent } from './buscador-estado-conservacion.component';

describe('BuscadorEstadoConservacionComponent', () => {
  let component: BuscadorEstadoConservacionComponent;
  let fixture: ComponentFixture<BuscadorEstadoConservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorEstadoConservacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorEstadoConservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
