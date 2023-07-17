import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivosProcesoComponent } from './activos-proceso.component';

describe('ActivosProcesoComponent', () => {
  let component: ActivosProcesoComponent;
  let fixture: ComponentFixture<ActivosProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivosProcesoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivosProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
