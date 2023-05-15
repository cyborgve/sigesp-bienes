import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralSeguroComponent } from './plural-seguro.component';

describe('PluralSeguroComponent', () => {
  let component: PluralSeguroComponent;
  let fixture: ComponentFixture<PluralSeguroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralSeguroComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
