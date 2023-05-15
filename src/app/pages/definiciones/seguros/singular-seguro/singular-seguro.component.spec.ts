import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularSeguroComponent } from './singular-seguro.component';

describe('SingularSeguroComponent', () => {
  let component: SingularSeguroComponent;
  let fixture: ComponentFixture<SingularSeguroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularSeguroComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
