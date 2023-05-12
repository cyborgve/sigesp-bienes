import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCategoriaUnidadAdministrativaComponent } from './tabla-categoria-unidad-administrativa.component';

describe('TablaCategoriaUnidadAdministrativaComponent', () => {
  let component: TablaCategoriaUnidadAdministrativaComponent;
  let fixture: ComponentFixture<TablaCategoriaUnidadAdministrativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaCategoriaUnidadAdministrativaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      TablaCategoriaUnidadAdministrativaComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
