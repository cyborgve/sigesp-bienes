import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularReasignacionComponent } from './singular-reasignacion.component';

describe('SingularReasignacionComponent', () => {
  let component: SingularReasignacionComponent;
  let fixture: ComponentFixture<SingularReasignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularReasignacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularReasignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
