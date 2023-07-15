import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularModificacionComponent } from './singular-modificacion.component';

describe('SingularModificacionComponent', () => {
  let component: SingularModificacionComponent;
  let fixture: ComponentFixture<SingularModificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularModificacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
