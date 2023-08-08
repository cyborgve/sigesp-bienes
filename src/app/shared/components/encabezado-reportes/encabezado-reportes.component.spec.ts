import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoReportesComponent } from './encabezado-reportes.component';

describe('EncabezadoReportesComponent', () => {
  let component: EncabezadoReportesComponent;
  let fixture: ComponentFixture<EncabezadoReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EncabezadoReportesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncabezadoReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
