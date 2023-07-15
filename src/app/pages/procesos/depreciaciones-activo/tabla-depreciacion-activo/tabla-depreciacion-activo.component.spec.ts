import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDepreciacionActivoComponent } from './tabla-depreciacion-activo.component';

describe('TablaDepreciacionActivoComponent', () => {
  let component: TablaDepreciacionActivoComponent;
  let fixture: ComponentFixture<TablaDepreciacionActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaDepreciacionActivoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaDepreciacionActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
