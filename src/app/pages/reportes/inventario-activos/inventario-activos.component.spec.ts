import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioActivosComponent } from './inventario-activos.component';

describe('InventarioActivosComponent', () => {
  let component: InventarioActivosComponent;
  let fixture: ComponentFixture<InventarioActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventarioActivosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
