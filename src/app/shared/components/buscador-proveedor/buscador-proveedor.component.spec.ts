import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorProveedorComponent } from './buscador-proveedor.component';

describe('BuscadorProveedorComponent', () => {
  let component: BuscadorProveedorComponent;
  let fixture: ComponentFixture<BuscadorProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorProveedorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
