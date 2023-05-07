import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivoComponenteComponent } from './activo-componente.component';

describe('ActivoComponenteComponent', () => {
  let component: ActivoComponenteComponent;
  let fixture: ComponentFixture<ActivoComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivoComponenteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivoComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
