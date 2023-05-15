import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularTipoCoberturaComponent } from './singular-tipo-cobertura.component';

describe('SingularTipoCoberturaComponent', () => {
  let component: SingularTipoCoberturaComponent;
  let fixture: ComponentFixture<SingularTipoCoberturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularTipoCoberturaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularTipoCoberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
