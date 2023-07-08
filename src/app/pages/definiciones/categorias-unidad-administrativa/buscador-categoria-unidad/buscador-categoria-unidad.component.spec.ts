import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCategoriaUnidadComponent } from './buscador-categoria-unidad.component';

describe('BuscadorCategoriaUnidadComponent', () => {
  let component: BuscadorCategoriaUnidadComponent;
  let fixture: ComponentFixture<BuscadorCategoriaUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorCategoriaUnidadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorCategoriaUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
