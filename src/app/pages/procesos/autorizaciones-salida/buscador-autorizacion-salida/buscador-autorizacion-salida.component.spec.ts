import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorAutorizacionSalidaComponent } from './buscador-autorizacion-salida.component';

describe('BuscadorAutorizacionSalidaComponent', () => {
  let component: BuscadorAutorizacionSalidaComponent;
  let fixture: ComponentFixture<BuscadorAutorizacionSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorAutorizacionSalidaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorAutorizacionSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
