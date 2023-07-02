import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorMonedaComponent } from './buscador-moneda.component';

describe('BuscadorMonedaComponent', () => {
  let component: BuscadorMonedaComponent;
  let fixture: ComponentFixture<BuscadorMonedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorMonedaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorMonedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
