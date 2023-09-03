import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadesActivoComponent } from './propiedades-activo.component';

describe('PropiedadesActivoComponent', () => {
  let component: PropiedadesActivoComponent;
  let fixture: ComponentFixture<PropiedadesActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropiedadesActivoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropiedadesActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
