import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonesAccionesProcesoComponent } from './botones-acciones-proceso.component';

describe('BotonesAccionesProcesoComponent', () => {
  let component: BotonesAccionesProcesoComponent;
  let fixture: ComponentFixture<BotonesAccionesProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BotonesAccionesProcesoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonesAccionesProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
