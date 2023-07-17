import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralDepreciacionComponent } from './plural-depreciacion.component';

describe('PluralDepreciacionComponent', () => {
  let component: PluralDepreciacionComponent;
  let fixture: ComponentFixture<PluralDepreciacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralDepreciacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralDepreciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
