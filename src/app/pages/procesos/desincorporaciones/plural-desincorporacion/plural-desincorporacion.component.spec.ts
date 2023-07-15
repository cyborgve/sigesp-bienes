import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralDesincorporacionComponent } from './plural-desincorporacion.component';

describe('PluralDesincorporacionComponent', () => {
  let component: PluralDesincorporacionComponent;
  let fixture: ComponentFixture<PluralDesincorporacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralDesincorporacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralDesincorporacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
