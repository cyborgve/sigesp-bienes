import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonesDefinicionComponent } from './botones-definicion.component';

describe('BotonesDefinicionComponent', () => {
  let component: BotonesDefinicionComponent;
  let fixture: ComponentFixture<BotonesDefinicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BotonesDefinicionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonesDefinicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
