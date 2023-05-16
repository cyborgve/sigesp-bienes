import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorTipoUsoComponent } from './buscador-tipo-uso.component';

describe('BuscadorTipoUsoComponent', () => {
  let component: BuscadorTipoUsoComponent;
  let fixture: ComponentFixture<BuscadorTipoUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorTipoUsoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorTipoUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
