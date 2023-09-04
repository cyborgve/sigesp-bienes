import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroEstadoUsoComponent } from './filtro-estado-uso.component';

describe('FiltroEstadoUsoComponent', () => {
  let component: FiltroEstadoUsoComponent;
  let fixture: ComponentFixture<FiltroEstadoUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroEstadoUsoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroEstadoUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
