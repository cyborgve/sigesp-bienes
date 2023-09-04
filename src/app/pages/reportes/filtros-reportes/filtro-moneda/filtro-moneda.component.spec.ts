import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroMonedaComponent } from './filtro-moneda.component';

describe('FiltroMonedaComponent', () => {
  let component: FiltroMonedaComponent;
  let fixture: ComponentFixture<FiltroMonedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroMonedaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroMonedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
