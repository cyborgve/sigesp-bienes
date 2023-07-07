import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralComponenteComponent } from './plural-componente.component';

describe('PluralComponenteComponent', () => {
  let component: PluralComponenteComponent;
  let fixture: ComponentFixture<PluralComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralComponenteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
