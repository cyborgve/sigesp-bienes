import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularCausaMovimientoComponent } from './singular-causa-movimiento.component';

describe('SingularCausaMovimientoComponent', () => {
  let component: SingularCausaMovimientoComponent;
  let fixture: ComponentFixture<SingularCausaMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularCausaMovimientoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularCausaMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
