import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularRazaComponent } from './singular-raza.component';

describe('SingularRazaComponent', () => {
  let component: SingularRazaComponent;
  let fixture: ComponentFixture<SingularRazaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularRazaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularRazaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
