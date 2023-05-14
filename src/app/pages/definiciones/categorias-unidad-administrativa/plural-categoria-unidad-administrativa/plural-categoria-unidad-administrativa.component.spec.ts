import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralCategoriaUnidadAdministrativaComponent } from './plural-categoria-unidad-administrativa.component';

describe('PluralCategoriaUnidadAdministrativaComponent', () => {
  let component: PluralCategoriaUnidadAdministrativaComponent;
  let fixture: ComponentFixture<PluralCategoriaUnidadAdministrativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralCategoriaUnidadAdministrativaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      PluralCategoriaUnidadAdministrativaComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
