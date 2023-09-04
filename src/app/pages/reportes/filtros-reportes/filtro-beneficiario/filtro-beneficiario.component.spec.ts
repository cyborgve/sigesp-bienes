import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroBeneficiarioComponent } from './filtro-beneficiario.component';

describe('FiltroBeneficiarioComponent', () => {
  let component: FiltroBeneficiarioComponent;
  let fixture: ComponentFixture<FiltroBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroBeneficiarioComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
