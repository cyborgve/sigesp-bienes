import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralOrigenComponent } from './plural-origen.component';

describe('PluralOrigenComponent', () => {
  let component: PluralOrigenComponent;
  let fixture: ComponentFixture<PluralOrigenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralOrigenComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
