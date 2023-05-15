import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEstadoUsoComponent } from './tabla-estado-uso.component';

describe('TablaEstadoUsoComponent', () => {
  let component: TablaEstadoUsoComponent;
  let fixture: ComponentFixture<TablaEstadoUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaEstadoUsoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaEstadoUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
