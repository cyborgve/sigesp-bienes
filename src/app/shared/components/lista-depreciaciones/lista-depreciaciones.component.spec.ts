import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDepreciacionesComponent } from './lista-depreciaciones.component';

describe('ListaDepreciacionesComponent', () => {
  let component: ListaDepreciacionesComponent;
  let fixture: ComponentFixture<ListaDepreciacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaDepreciacionesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDepreciacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
