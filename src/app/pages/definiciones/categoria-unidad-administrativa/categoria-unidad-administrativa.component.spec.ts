import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaUnidadAdministrativaComponent } from './categoria-unidad-administrativa.component';

describe('CategoriaUnidadAdministrativaComponent', () => {
  let component: CategoriaUnidadAdministrativaComponent;
  let fixture: ComponentFixture<CategoriaUnidadAdministrativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriaUnidadAdministrativaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaUnidadAdministrativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
