import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivoDepreciacionComponent } from './activo-depreciacion.component';

describe('ActivoDepreciacionComponent', () => {
  let component: ActivoDepreciacionComponent;
  let fixture: ComponentFixture<ActivoDepreciacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivoDepreciacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivoDepreciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
