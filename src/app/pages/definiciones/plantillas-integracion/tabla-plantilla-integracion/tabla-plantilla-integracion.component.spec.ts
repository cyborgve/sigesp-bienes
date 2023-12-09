import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPlantillaIntegracionComponent } from './tabla-plantilla-integracion.component';

describe('TablaPlantillaIntegracionComponent', () => {
  let component: TablaPlantillaIntegracionComponent;
  let fixture: ComponentFixture<TablaPlantillaIntegracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaPlantillaIntegracionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPlantillaIntegracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
