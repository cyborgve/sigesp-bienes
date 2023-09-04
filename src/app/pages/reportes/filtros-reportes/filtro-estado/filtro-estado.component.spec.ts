import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroEstadoComponent } from './filtro-estado.component';

describe('FiltroEstadoComponent', () => {
  let component: FiltroEstadoComponent;
  let fixture: ComponentFixture<FiltroEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroEstadoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
