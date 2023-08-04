import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCatalogoGeneralComponent } from './tabla-catalogo-general.component';

describe('TablaCatalogoGeneralComponent', () => {
  let component: TablaCatalogoGeneralComponent;
  let fixture: ComponentFixture<TablaCatalogoGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaCatalogoGeneralComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCatalogoGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
