import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTipoPolizaComponent } from './tabla-tipo-poliza.component';

describe('TablaTipoPolizaComponent', () => {
  let component: TablaTipoPolizaComponent;
  let fixture: ComponentFixture<TablaTipoPolizaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaTipoPolizaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaTipoPolizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
