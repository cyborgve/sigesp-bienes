import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralSedeComponent } from './plural-sede.component';

describe('PluralSedeComponent', () => {
  let component: PluralSedeComponent;
  let fixture: ComponentFixture<PluralSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralSedeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
