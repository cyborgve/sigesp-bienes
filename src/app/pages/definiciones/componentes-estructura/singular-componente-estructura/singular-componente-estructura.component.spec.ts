import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularComponenteEstructuraComponent } from './singular-componente-estructura.component';

describe('SingularComponenteEstructuraComponent', () => {
  let component: SingularComponenteEstructuraComponent;
  let fixture: ComponentFixture<SingularComponenteEstructuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularComponenteEstructuraComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularComponenteEstructuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
