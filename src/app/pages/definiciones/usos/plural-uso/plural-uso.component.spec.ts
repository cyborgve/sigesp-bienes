import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralUsoComponent } from './plural-uso.component';

describe('PluralUsoComponent', () => {
  let component: PluralUsoComponent;
  let fixture: ComponentFixture<PluralUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralUsoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
