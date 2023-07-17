import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularDepreciacionComponent } from './singular-depreciacion.component';

describe('SingularDepreciacionComponent', () => {
  let component: SingularDepreciacionComponent;
  let fixture: ComponentFixture<SingularDepreciacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularDepreciacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularDepreciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
