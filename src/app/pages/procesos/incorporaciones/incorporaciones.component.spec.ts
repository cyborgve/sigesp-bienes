import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorporacionesComponent } from './incorporaciones.component';

describe('IncorporacionesComponent', () => {
  let component: IncorporacionesComponent;
  let fixture: ComponentFixture<IncorporacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncorporacionesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncorporacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
