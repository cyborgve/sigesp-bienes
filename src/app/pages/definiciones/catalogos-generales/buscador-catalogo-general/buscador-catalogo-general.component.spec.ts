import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCatalogoGeneralComponent } from './buscador-catalogo-general.component';

describe('BuscadorCatalogoGeneralComponent', () => {
  let component: BuscadorCatalogoGeneralComponent;
  let fixture: ComponentFixture<BuscadorCatalogoGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorCatalogoGeneralComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorCatalogoGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
