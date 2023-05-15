import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEstadoConservacionComponent } from './tabla-estado-conservacion.component';

describe('TablaEstadoConservacionComponent', () => {
  let component: TablaEstadoConservacionComponent;
  let fixture: ComponentFixture<TablaEstadoConservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaEstadoConservacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaEstadoConservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
