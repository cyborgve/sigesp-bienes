import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCategoriaUnidadComponent } from './tabla-categoria-unidad.component';

describe('TablaCategoriaUnidadComponent', () => {
  let component: TablaCategoriaUnidadComponent;
  let fixture: ComponentFixture<TablaCategoriaUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaCategoriaUnidadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCategoriaUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
