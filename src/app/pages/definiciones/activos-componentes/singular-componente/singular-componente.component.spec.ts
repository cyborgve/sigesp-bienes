import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularComponenteComponent } from './singular-componente.component';

describe('SingularComponenteComponent', () => {
  let component: SingularComponenteComponent;
  let fixture: ComponentFixture<SingularComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularComponenteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
