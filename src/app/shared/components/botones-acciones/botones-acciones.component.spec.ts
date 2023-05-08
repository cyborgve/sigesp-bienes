import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonesAccionesComponent } from './botones-acciones.component';

describe('BotonesAccionesComponent', () => {
  let component: BotonesAccionesComponent;
  let fixture: ComponentFixture<BotonesAccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BotonesAccionesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonesAccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
