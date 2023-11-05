import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaActasPrestamoComponent } from './lista-actas-prestamo.component';

describe('ListaActasPrestamoComponent', () => {
  let component: ListaActasPrestamoComponent;
  let fixture: ComponentFixture<ListaActasPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaActasPrestamoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaActasPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
