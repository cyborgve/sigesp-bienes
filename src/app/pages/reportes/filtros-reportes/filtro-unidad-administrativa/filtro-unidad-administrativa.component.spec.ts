import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroUnidadAdministrativaComponent } from './filtro-unidad-administrativa.component';

describe('FiltroUnidadAdministrativaComponent', () => {
  let component: FiltroUnidadAdministrativaComponent;
  let fixture: ComponentFixture<FiltroUnidadAdministrativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroUnidadAdministrativaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroUnidadAdministrativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
