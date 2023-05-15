import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularEstadoUsoComponent } from './singular-estado-uso.component';

describe('SingularEstadoUsoComponent', () => {
  let component: SingularEstadoUsoComponent;
  let fixture: ComponentFixture<SingularEstadoUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularEstadoUsoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularEstadoUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
