import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCondicionCompraComponent } from './buscador-condicion-compra.component';

describe('BuscadorCondicionCompraComponent', () => {
  let component: BuscadorCondicionCompraComponent;
  let fixture: ComponentFixture<BuscadorCondicionCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorCondicionCompraComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorCondicionCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
