import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralRotulacionComponent } from './plural-rotulacion.component';

describe('PluralRotulacionComponent', () => {
  let component: PluralRotulacionComponent;
  let fixture: ComponentFixture<PluralRotulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralRotulacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralRotulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
