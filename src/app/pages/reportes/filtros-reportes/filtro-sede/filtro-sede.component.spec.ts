import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroSedeComponent } from './filtro-sede.component';

describe('FiltroSedeComponent', () => {
  let component: FiltroSedeComponent;
  let fixture: ComponentFixture<FiltroSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroSedeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
