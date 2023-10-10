import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularCorrelativoComponent } from './singular-correlativo.component';

describe('SingularCorrelativoComponent', () => {
  let component: SingularCorrelativoComponent;
  let fixture: ComponentFixture<SingularCorrelativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularCorrelativoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularCorrelativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
