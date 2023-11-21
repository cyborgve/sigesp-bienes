import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDepreciacionesAnualesComponent } from './lista-depreciaciones-anuales.component';

describe('ListaDepreciacionesAnualesComponent', () => {
  let component: ListaDepreciacionesAnualesComponent;
  let fixture: ComponentFixture<ListaDepreciacionesAnualesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaDepreciacionesAnualesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDepreciacionesAnualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
