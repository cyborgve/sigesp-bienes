import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralActaPrestamoComponent } from './plural-acta-prestamo.component';

describe('PluralActaPrestamoComponent', () => {
  let component: PluralActaPrestamoComponent;
  let fixture: ComponentFixture<PluralActaPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralActaPrestamoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralActaPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
