import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoSpinnerComponent } from './dialogo-spinner.component';

describe('DialogoSpinnerComponent', () => {
  let component: DialogoSpinnerComponent;
  let fixture: ComponentFixture<DialogoSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogoSpinnerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
