import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularIncorporacionComponent } from './singular-incorporacion.component';

describe('SingularIncorporacionComponent', () => {
  let component: SingularIncorporacionComponent;
  let fixture: ComponentFixture<SingularIncorporacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularIncorporacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularIncorporacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
