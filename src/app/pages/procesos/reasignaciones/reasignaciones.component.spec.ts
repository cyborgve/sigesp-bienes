import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasignacionesComponent } from './reasignaciones.component';

describe('ReasignacionesComponent', () => {
  let component: ReasignacionesComponent;
  let fixture: ComponentFixture<ReasignacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReasignacionesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasignacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
