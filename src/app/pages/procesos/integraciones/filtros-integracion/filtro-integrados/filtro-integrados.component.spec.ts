import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroIntegradosComponent } from './filtro-integrados.component';

describe('FiltroIntegradosComponent', () => {
  let component: FiltroIntegradosComponent;
  let fixture: ComponentFixture<FiltroIntegradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroIntegradosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroIntegradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
