import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularRotulacionComponent } from './singular-rotulacion.component';

describe('SingularRotulacionComponent', () => {
  let component: SingularRotulacionComponent;
  let fixture: ComponentFixture<SingularRotulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularRotulacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularRotulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
