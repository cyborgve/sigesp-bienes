import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTipoComponenteComponent } from './filtro-tipo-componente.component';

describe('FiltroTipoComponenteComponent', () => {
  let component: FiltroTipoComponenteComponent;
  let fixture: ComponentFixture<FiltroTipoComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroTipoComponenteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroTipoComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
