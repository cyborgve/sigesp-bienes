import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorPlantillaDepreciacionComponent } from './buscador-plantilla-depreciacion.component';

describe('BuscadorPlantillaDepreciacionComponent', () => {
  let component: BuscadorPlantillaDepreciacionComponent;
  let fixture: ComponentFixture<BuscadorPlantillaDepreciacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorPlantillaDepreciacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorPlantillaDepreciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
