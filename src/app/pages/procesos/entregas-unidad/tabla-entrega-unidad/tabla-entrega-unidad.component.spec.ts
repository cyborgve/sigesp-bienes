import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEntregaUnidadComponent } from './tabla-entrega-unidad.component';

describe('TablaEntregaUnidadComponent', () => {
  let component: TablaEntregaUnidadComponent;
  let fixture: ComponentFixture<TablaEntregaUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaEntregaUnidadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaEntregaUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
