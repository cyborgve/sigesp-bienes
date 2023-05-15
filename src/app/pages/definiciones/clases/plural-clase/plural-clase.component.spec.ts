import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralClaseComponent } from './plural-clase.component';

describe('PluralClaseComponent', () => {
  let component: PluralClaseComponent;
  let fixture: ComponentFixture<PluralClaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralClaseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
