import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivoDatosGeneralesComponent } from './activo-datos-generales.component';

describe('ActivoDatosGeneralesComponent', () => {
  let component: ActivoDatosGeneralesComponent;
  let fixture: ComponentFixture<ActivoDatosGeneralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivoDatosGeneralesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivoDatosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
