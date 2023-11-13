import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroCategoriaUnidadAdministrativaComponent } from './filtro-categoria-unidad-administrativa.component';

describe('FiltroCategoriaUnidadAdministrativaComponent', () => {
  let component: FiltroCategoriaUnidadAdministrativaComponent;
  let fixture: ComponentFixture<FiltroCategoriaUnidadAdministrativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroCategoriaUnidadAdministrativaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      FiltroCategoriaUnidadAdministrativaComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
