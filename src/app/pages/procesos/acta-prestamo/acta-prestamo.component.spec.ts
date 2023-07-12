import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActaPrestamoComponent } from './acta-prestamo.component';

describe('ActaPrestamoComponent', () => {
  let component: ActaPrestamoComponent;
  let fixture: ComponentFixture<ActaPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActaPrestamoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActaPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
