import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorTipoPolizaComponent } from './buscador-tipo-poliza.component';

describe('BuscadorTipoPolizaComponent', () => {
  let component: BuscadorTipoPolizaComponent;
  let fixture: ComponentFixture<BuscadorTipoPolizaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorTipoPolizaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorTipoPolizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
