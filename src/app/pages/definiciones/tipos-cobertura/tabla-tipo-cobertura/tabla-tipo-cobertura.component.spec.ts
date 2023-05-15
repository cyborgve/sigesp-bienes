import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTipoCoberturaComponent } from './tabla-tipo-cobertura.component';

describe('TablaTipoCoberturaComponent', () => {
  let component: TablaTipoCoberturaComponent;
  let fixture: ComponentFixture<TablaTipoCoberturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaTipoCoberturaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaTipoCoberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
