import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCambioResponsableComponent } from './tabla-cambio-responsable.component';

describe('TablaCambioResponsableComponent', () => {
  let component: TablaCambioResponsableComponent;
  let fixture: ComponentFixture<TablaCambioResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaCambioResponsableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCambioResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
