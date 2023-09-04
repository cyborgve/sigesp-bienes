import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroClaseComponent } from './filtro-clase.component';

describe('FiltroClaseComponent', () => {
  let component: FiltroClaseComponent;
  let fixture: ComponentFixture<FiltroClaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroClaseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
