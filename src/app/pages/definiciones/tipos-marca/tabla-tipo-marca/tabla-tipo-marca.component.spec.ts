import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTipoMarcaComponent } from './tabla-tipo-marca.component';

describe('TablaTipoMarcaComponent', () => {
  let component: TablaTipoMarcaComponent;
  let fixture: ComponentFixture<TablaTipoMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaTipoMarcaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaTipoMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
