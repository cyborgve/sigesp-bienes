import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularCategoriaUnidadAdministrativaComponent } from './singular-categoria-unidad-administrativa.component';

describe('SingularCategoriaUnidadAdministrativaComponent', () => {
  let component: SingularCategoriaUnidadAdministrativaComponent;
  let fixture: ComponentFixture<SingularCategoriaUnidadAdministrativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularCategoriaUnidadAdministrativaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      SingularCategoriaUnidadAdministrativaComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
