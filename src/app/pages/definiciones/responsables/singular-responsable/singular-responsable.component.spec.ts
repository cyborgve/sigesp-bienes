import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularResponsableComponent } from './singular-responsable.component';

describe('SingularResponsableComponent', () => {
  let component: SingularResponsableComponent;
  let fixture: ComponentFixture<SingularResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularResponsableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
