import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCambioResponsableComponent } from './buscador-cambio-responsable.component';

describe('BuscadorCambioResponsableComponent', () => {
  let component: BuscadorCambioResponsableComponent;
  let fixture: ComponentFixture<BuscadorCambioResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorCambioResponsableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorCambioResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
