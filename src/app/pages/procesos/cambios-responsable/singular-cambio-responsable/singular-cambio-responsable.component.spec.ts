import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularCambioResponsableComponent } from './singular-cambio-responsable.component';

describe('SingularCambioResponsableComponent', () => {
  let component: SingularCambioResponsableComponent;
  let fixture: ComponentFixture<SingularCambioResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularCambioResponsableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularCambioResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
