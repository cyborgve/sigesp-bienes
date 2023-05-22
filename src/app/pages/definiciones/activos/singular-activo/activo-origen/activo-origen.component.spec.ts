import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivoOrigenComponent } from './activo-origen.component';

describe('ActivoOrigenComponent', () => {
  let component: ActivoOrigenComponent;
  let fixture: ComponentFixture<ActivoOrigenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivoOrigenComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivoOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
