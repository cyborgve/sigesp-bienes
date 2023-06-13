import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularPlantillaDepreciacionComponent } from './singular-plantilla-depreciacion.component';

describe('SingularPlantillaDepreciacionComponent', () => {
  let component: SingularPlantillaDepreciacionComponent;
  let fixture: ComponentFixture<SingularPlantillaDepreciacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularPlantillaDepreciacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularPlantillaDepreciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
