import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInventarioActivosComponent } from './lista-inventario-activos.component';

describe('ListaInventarioActivosComponent', () => {
  let component: ListaInventarioActivosComponent;
  let fixture: ComponentFixture<ListaInventarioActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaInventarioActivosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaInventarioActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
