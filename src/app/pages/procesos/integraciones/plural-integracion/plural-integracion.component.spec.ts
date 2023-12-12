import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralIntegracionComponent } from './plural-integracion.component';

describe('PluralIntegracionComponent', () => {
  let component: PluralIntegracionComponent;
  let fixture: ComponentFixture<PluralIntegracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralIntegracionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralIntegracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
