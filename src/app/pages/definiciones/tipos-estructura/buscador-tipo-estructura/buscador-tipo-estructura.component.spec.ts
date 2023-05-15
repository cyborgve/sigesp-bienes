import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorTipoEstructuraComponent } from './buscador-tipo-estructura.component';

describe('BuscadorTipoEstructuraComponent', () => {
  let component: BuscadorTipoEstructuraComponent;
  let fixture: ComponentFixture<BuscadorTipoEstructuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorTipoEstructuraComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorTipoEstructuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
