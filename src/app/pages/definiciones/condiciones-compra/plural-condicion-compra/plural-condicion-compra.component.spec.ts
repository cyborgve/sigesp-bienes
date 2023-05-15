import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralCondicionCompraComponent } from './plural-condicion-compra.component';

describe('PluralCondicionCompraComponent', () => {
  let component: PluralCondicionCompraComponent;
  let fixture: ComponentFixture<PluralCondicionCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralCondicionCompraComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralCondicionCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
