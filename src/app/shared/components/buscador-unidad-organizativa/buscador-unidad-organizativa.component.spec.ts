import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorUnidadOrganizativaComponent } from './buscador-unidad-organizativa.component';

describe('BuscadorUnidadOrganizativaComponent', () => {
  let component: BuscadorUnidadOrganizativaComponent;
  let fixture: ComponentFixture<BuscadorUnidadOrganizativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorUnidadOrganizativaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorUnidadOrganizativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
