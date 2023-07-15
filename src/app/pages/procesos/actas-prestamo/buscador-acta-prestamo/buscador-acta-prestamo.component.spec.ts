import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorActaPrestamoComponent } from './buscador-acta-prestamo.component';

describe('BuscadorActaPrestamoComponent', () => {
  let component: BuscadorActaPrestamoComponent;
  let fixture: ComponentFixture<BuscadorActaPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorActaPrestamoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorActaPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
