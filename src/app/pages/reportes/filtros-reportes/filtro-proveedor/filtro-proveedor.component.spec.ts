import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroProveedorComponent } from './filtro-proveedor.component';

describe('FiltroProveedorComponent', () => {
  let component: FiltroProveedorComponent;
  let fixture: ComponentFixture<FiltroProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroProveedorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
