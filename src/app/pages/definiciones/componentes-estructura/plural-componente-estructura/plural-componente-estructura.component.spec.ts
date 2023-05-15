import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralComponenteEstructuraComponent } from './plural-componente-estructura.component';

describe('PluralComponenteEstructuraComponent', () => {
  let component: PluralComponenteEstructuraComponent;
  let fixture: ComponentFixture<PluralComponenteEstructuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralComponenteEstructuraComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralComponenteEstructuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
