import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTipoProcesoComponent } from './filtro-tipo-proceso.component';

describe('FiltroTipoProcesoComponent', () => {
  let component: FiltroTipoProcesoComponent;
  let fixture: ComponentFixture<FiltroTipoProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroTipoProcesoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroTipoProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
