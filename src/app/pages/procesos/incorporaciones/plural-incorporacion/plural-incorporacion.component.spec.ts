import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralIncorporacionComponent } from './plural-incorporacion.component';

describe('PluralIncorporacionComponent', () => {
  let component: PluralIncorporacionComponent;
  let fixture: ComponentFixture<PluralIncorporacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralIncorporacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralIncorporacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
