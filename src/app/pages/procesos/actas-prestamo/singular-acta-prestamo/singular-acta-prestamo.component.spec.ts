import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularActaPrestamoComponent } from './singular-acta-prestamo.component';

describe('SingularActaPrestamoComponent', () => {
  let component: SingularActaPrestamoComponent;
  let fixture: ComponentFixture<SingularActaPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularActaPrestamoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularActaPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
