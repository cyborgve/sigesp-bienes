import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivoDetallesComponent } from './activo-detalles.component';

describe('ActivoDetallesComponent', () => {
  let component: ActivoDetallesComponent;
  let fixture: ComponentFixture<ActivoDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivoDetallesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivoDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
