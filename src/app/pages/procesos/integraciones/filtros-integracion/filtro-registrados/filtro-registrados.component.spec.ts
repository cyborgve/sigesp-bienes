import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroRegistradosComponent } from './filtro-registrados.component';

describe('FiltroRegistradosComponent', () => {
  let component: FiltroRegistradosComponent;
  let fixture: ComponentFixture<FiltroRegistradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroRegistradosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroRegistradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
