import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorTipoAnimalComponent } from './buscador-tipo-animal.component';

describe('BuscadorTipoAnimalComponent', () => {
  let component: BuscadorTipoAnimalComponent;
  let fixture: ComponentFixture<BuscadorTipoAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorTipoAnimalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorTipoAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
