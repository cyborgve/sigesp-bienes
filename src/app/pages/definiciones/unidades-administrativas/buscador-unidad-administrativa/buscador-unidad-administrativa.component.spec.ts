import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorUnidadAdministrativaComponent } from './buscador-unidad-administrativa.component';

describe('BuscadorUnidadAdministrativaComponent', () => {
  let component: BuscadorUnidadAdministrativaComponent;
  let fixture: ComponentFixture<BuscadorUnidadAdministrativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorUnidadAdministrativaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorUnidadAdministrativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
