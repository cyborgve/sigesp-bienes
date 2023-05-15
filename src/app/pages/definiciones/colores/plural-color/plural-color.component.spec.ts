import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralColorComponent } from './plural-color.component';

describe('PluralColorComponent', () => {
  let component: PluralColorComponent;
  let fixture: ComponentFixture<PluralColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralColorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
