import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDepreciacionesMensualesComponent } from './lista-depreciaciones-mensuales.component';

describe('ListaDepreciacionesMensualesComponent', () => {
  let component: ListaDepreciacionesMensualesComponent;
  let fixture: ComponentFixture<ListaDepreciacionesMensualesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaDepreciacionesMensualesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDepreciacionesMensualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
