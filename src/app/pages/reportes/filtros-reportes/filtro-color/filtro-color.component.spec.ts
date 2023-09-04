import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroColorComponent } from './filtro-color.component';

describe('FiltroColorComponent', () => {
  let component: FiltroColorComponent;
  let fixture: ComponentFixture<FiltroColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroColorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
