import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCategoriaUnidadAdministrativaComponent } from './buscador-categoria-unidad-administrativa.component';

describe('BuscadorCategoriaUnidadAdministrativaComponent', () => {
  let component: BuscadorCategoriaUnidadAdministrativaComponent;
  let fixture: ComponentFixture<BuscadorCategoriaUnidadAdministrativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorCategoriaUnidadAdministrativaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      BuscadorCategoriaUnidadAdministrativaComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
