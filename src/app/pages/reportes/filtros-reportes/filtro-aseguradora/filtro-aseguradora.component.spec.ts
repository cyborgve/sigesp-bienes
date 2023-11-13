import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroSeguroComponent } from './filtro-aseguradora.component';

describe('FiltroSeguroComponent', () => {
  let component: FiltroSeguroComponent;
  let fixture: ComponentFixture<FiltroSeguroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroSeguroComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
