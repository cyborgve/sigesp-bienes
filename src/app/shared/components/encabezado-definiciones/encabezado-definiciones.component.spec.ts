import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoDefinicionesComponent } from './encabezado-definiciones.component';

describe('EncabezadoDefinicionesComponent', () => {
  let component: EncabezadoDefinicionesComponent;
  let fixture: ComponentFixture<EncabezadoDefinicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EncabezadoDefinicionesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncabezadoDefinicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
