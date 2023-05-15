import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorTipoMarcaComponent } from './buscador-tipo-marca.component';

describe('BuscadorTipoMarcaComponent', () => {
  let component: BuscadorTipoMarcaComponent;
  let fixture: ComponentFixture<BuscadorTipoMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorTipoMarcaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorTipoMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
