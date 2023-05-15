import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularColorComponent } from './singular-color.component';

describe('SingularColorComponent', () => {
  let component: SingularColorComponent;
  let fixture: ComponentFixture<SingularColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularColorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
