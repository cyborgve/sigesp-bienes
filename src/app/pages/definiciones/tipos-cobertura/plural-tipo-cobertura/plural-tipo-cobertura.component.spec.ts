import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralTipoCoberturaComponent } from './plural-tipo-cobertura.component';

describe('PluralTipoCoberturaComponent', () => {
  let component: PluralTipoCoberturaComponent;
  let fixture: ComponentFixture<PluralTipoCoberturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralTipoCoberturaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralTipoCoberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
