import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorBeneficiarioComponent } from './buscador-beneficiario.component';

describe('BuscadorBeneficiarioComponent', () => {
  let component: BuscadorBeneficiarioComponent;
  let fixture: ComponentFixture<BuscadorBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorBeneficiarioComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
