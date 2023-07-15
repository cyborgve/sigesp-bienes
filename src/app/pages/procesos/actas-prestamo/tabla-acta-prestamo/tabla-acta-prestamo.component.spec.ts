import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaActaPrestamoComponent } from './tabla-acta-prestamo.component';

describe('TablaActaPrestamoComponent', () => {
  let component: TablaActaPrestamoComponent;
  let fixture: ComponentFixture<TablaActaPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaActaPrestamoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaActaPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
