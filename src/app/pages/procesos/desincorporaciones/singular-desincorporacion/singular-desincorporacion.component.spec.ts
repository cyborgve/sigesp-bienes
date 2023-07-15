import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularDesincorporacionComponent } from './singular-desincorporacion.component';

describe('SingularDesincorporacionComponent', () => {
  let component: SingularDesincorporacionComponent;
  let fixture: ComponentFixture<SingularDesincorporacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularDesincorporacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularDesincorporacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
