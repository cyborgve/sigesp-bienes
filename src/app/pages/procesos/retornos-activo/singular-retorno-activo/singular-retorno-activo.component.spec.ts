import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularRetornoActivoComponent } from './singular-retorno-activo.component';

describe('SingularRetornoActivoComponent', () => {
  let component: SingularRetornoActivoComponent;
  let fixture: ComponentFixture<SingularRetornoActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularRetornoActivoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularRetornoActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
