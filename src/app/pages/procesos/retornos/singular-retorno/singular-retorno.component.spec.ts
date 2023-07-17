import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularRetornoComponent } from './singular-retorno.component';

describe('SingularRetornoComponent', () => {
  let component: SingularRetornoComponent;
  let fixture: ComponentFixture<SingularRetornoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularRetornoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularRetornoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
