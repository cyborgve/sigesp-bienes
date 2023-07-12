import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesincorporacionesComponent } from './desincorporaciones.component';

describe('DesincorporacionesComponent', () => {
  let component: DesincorporacionesComponent;
  let fixture: ComponentFixture<DesincorporacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesincorporacionesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesincorporacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
