import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTipoComponenteComponent } from './tabla-tipo-componente.component';

describe('TablaTipoComponenteComponent', () => {
  let component: TablaTipoComponenteComponent;
  let fixture: ComponentFixture<TablaTipoComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaTipoComponenteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaTipoComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
