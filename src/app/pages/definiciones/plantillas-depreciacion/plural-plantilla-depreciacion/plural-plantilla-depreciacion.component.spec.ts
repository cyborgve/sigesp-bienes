import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralPlantillaDepreciacionComponent } from './plural-plantilla-depreciacion.component';

describe('PluralPlantillaDepreciacionComponent', () => {
  let component: PluralPlantillaDepreciacionComponent;
  let fixture: ComponentFixture<PluralPlantillaDepreciacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralPlantillaDepreciacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralPlantillaDepreciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
