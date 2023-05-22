import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularUsoComponent } from './singular-uso.component';

describe('SingularUsoComponent', () => {
  let component: SingularUsoComponent;
  let fixture: ComponentFixture<SingularUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularUsoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
