import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivoIntegracionComponent } from './activo-integracion.component';

describe('ActivoIntegracionComponent', () => {
  let component: ActivoIntegracionComponent;
  let fixture: ComponentFixture<ActivoIntegracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivoIntegracionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivoIntegracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
