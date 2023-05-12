import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonesDefinicionesComponent } from './botones-definiciones.component';

describe('BotonesDefinicionesComponent', () => {
  let component: BotonesDefinicionesComponent;
  let fixture: ComponentFixture<BotonesDefinicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BotonesDefinicionesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonesDefinicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
