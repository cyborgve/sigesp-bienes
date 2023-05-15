import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularClaseComponent } from './singular-clase.component';

describe('SingularClaseComponent', () => {
  let component: SingularClaseComponent;
  let fixture: ComponentFixture<SingularClaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularClaseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
