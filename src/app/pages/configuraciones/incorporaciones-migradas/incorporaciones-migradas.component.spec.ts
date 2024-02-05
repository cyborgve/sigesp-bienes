import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorporacionesMigradasComponent } from './incorporaciones-migradas.component';

describe('IncorporacionesMigradasComponent', () => {
  let component: IncorporacionesMigradasComponent;
  let fixture: ComponentFixture<IncorporacionesMigradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncorporacionesMigradasComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncorporacionesMigradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
