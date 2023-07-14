import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoProcesosComponent } from './encabezado-procesos.component';

describe('EncabezadoProcesosComponent', () => {
  let component: EncabezadoProcesosComponent;
  let fixture: ComponentFixture<EncabezadoProcesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EncabezadoProcesosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncabezadoProcesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
