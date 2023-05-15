import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralResponsableComponent } from './plural-responsable.component';

describe('PluralResponsableComponent', () => {
  let component: PluralResponsableComponent;
  let fixture: ComponentFixture<PluralResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralResponsableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
