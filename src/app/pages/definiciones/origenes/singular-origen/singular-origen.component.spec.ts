import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularOrigenComponent } from './singular-origen.component';

describe('SingularOrigenComponent', () => {
  let component: SingularOrigenComponent;
  let fixture: ComponentFixture<SingularOrigenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularOrigenComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
