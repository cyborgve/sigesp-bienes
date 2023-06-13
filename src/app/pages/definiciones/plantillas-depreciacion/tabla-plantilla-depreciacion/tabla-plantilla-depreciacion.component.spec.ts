import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPlantillaDepreciacionComponent } from './tabla-plantilla-depreciacion.component';

describe('TablaPlantillaDepreciacionComponent', () => {
  let component: TablaPlantillaDepreciacionComponent;
  let fixture: ComponentFixture<TablaPlantillaDepreciacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaPlantillaDepreciacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPlantillaDepreciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
