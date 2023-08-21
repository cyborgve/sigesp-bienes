import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieReporteComponent } from './pie-reporte.component';

describe('PieReporteComponent', () => {
  let component: PieReporteComponent;
  let fixture: ComponentFixture<PieReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieReporteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
