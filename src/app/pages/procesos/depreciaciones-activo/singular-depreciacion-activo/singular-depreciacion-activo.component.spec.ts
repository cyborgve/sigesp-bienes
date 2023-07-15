import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularDepreciacionActivoComponent } from './singular-depreciacion-activo.component';

describe('SingularDepreciacionActivoComponent', () => {
  let component: SingularDepreciacionActivoComponent;
  let fixture: ComponentFixture<SingularDepreciacionActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularDepreciacionActivoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularDepreciacionActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
