import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularActivoComponent } from './singular-activo.component';

describe('SingularActivoComponent', () => {
  let component: SingularActivoComponent;
  let fixture: ComponentFixture<SingularActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularActivoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
