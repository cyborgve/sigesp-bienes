import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorRetornoActivoComponent } from './buscador-retorno-activo.component';

describe('BuscadorRetornoActivoComponent', () => {
  let component: BuscadorRetornoActivoComponent;
  let fixture: ComponentFixture<BuscadorRetornoActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorRetornoActivoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorRetornoActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
