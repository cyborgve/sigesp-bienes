import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularActivoComponenteComponent } from './singular-activo-componente.component';

describe('SingularActivoComponenteComponent', () => {
  let component: SingularActivoComponenteComponent;
  let fixture: ComponentFixture<SingularActivoComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularActivoComponenteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularActivoComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
