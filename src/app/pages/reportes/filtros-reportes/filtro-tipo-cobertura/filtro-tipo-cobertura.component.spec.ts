import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTipoCoberturaComponent } from './filtro-tipo-cobertura.component';

describe('FiltroTipoCoberturaComponent', () => {
  let component: FiltroTipoCoberturaComponent;
  let fixture: ComponentFixture<FiltroTipoCoberturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroTipoCoberturaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroTipoCoberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
