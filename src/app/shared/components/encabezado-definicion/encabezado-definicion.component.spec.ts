import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoDefinicionComponent } from './encabezado-definicion.component';

describe('EncabezadoDefinicionComponent', () => {
  let component: EncabezadoDefinicionComponent;
  let fixture: ComponentFixture<EncabezadoDefinicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EncabezadoDefinicionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncabezadoDefinicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
