import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroRotulacionComponent } from './filtro-rotulacion.component';

describe('FiltroRotulacionComponent', () => {
  let component: FiltroRotulacionComponent;
  let fixture: ComponentFixture<FiltroRotulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroRotulacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroRotulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
