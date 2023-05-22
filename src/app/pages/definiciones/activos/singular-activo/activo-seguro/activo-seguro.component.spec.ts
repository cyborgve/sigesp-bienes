import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivoSeguroComponent } from './activo-seguro.component';

describe('ActivoSeguroComponent', () => {
  let component: ActivoSeguroComponent;
  let fixture: ComponentFixture<ActivoSeguroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivoSeguroComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivoSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
