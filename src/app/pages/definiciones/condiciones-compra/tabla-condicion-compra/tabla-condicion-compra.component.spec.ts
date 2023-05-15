import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCondicionCompraComponent } from './tabla-condicion-compra.component';

describe('TablaCondicionCompraComponent', () => {
  let component: TablaCondicionCompraComponent;
  let fixture: ComponentFixture<TablaCondicionCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaCondicionCompraComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCondicionCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
