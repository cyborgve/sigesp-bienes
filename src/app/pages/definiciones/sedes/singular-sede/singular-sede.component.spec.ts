import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularSedeComponent } from './singular-sede.component';

describe('SingularSedeComponent', () => {
  let component: SingularSedeComponent;
  let fixture: ComponentFixture<SingularSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularSedeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
