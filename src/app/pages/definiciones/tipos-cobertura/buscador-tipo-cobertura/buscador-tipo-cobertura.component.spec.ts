import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorTipoCoberturaComponent } from './buscador-tipo-cobertura.component';

describe('BuscadorTipoCoberturaComponent', () => {
  let component: BuscadorTipoCoberturaComponent;
  let fixture: ComponentFixture<BuscadorTipoCoberturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorTipoCoberturaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorTipoCoberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
