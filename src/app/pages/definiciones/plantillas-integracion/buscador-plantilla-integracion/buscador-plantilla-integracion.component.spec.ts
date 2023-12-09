import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorPlantillaIntegracionComponent } from './buscador-plantilla-integracion.component';

describe('BuscadorPlantillaIntegracionComponent', () => {
  let component: BuscadorPlantillaIntegracionComponent;
  let fixture: ComponentFixture<BuscadorPlantillaIntegracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorPlantillaIntegracionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorPlantillaIntegracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
