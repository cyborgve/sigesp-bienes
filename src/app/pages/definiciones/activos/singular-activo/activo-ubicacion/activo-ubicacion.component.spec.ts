import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivoUbicacionComponent } from './activo-ubicacion.component';

describe('ActivoUbicacionComponent', () => {
  let component: ActivoUbicacionComponent;
  let fixture: ComponentFixture<ActivoUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivoUbicacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivoUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
