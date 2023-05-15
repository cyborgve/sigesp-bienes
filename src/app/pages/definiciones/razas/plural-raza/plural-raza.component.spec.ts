import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralRazaComponent } from './plural-raza.component';

describe('PluralRazaComponent', () => {
  let component: PluralRazaComponent;
  let fixture: ComponentFixture<PluralRazaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralRazaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralRazaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
