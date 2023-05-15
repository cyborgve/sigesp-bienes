import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorTipoComponenteComponent } from './buscador-tipo-componente.component';

describe('BuscadorTipoComponenteComponent', () => {
  let component: BuscadorTipoComponenteComponent;
  let fixture: ComponentFixture<BuscadorTipoComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorTipoComponenteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorTipoComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
