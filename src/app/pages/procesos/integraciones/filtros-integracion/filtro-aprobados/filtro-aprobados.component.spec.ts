import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAprobadosComponent } from './filtro-aprobados.component';

describe('FiltroAprobadosComponent', () => {
  let component: FiltroAprobadosComponent;
  let fixture: ComponentFixture<FiltroAprobadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroAprobadosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAprobadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
