import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralCorrelativoComponent } from './plural-correlativo.component';

describe('PluralCorrelativoComponent', () => {
  let component: PluralCorrelativoComponent;
  let fixture: ComponentFixture<PluralCorrelativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralCorrelativoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralCorrelativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
