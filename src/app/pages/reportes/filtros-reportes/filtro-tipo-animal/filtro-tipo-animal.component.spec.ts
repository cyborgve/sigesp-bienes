import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTipoAnimalComponent } from './filtro-tipo-animal.component';

describe('FiltroTipoAnimalComponent', () => {
  let component: FiltroTipoAnimalComponent;
  let fixture: ComponentFixture<FiltroTipoAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroTipoAnimalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroTipoAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
