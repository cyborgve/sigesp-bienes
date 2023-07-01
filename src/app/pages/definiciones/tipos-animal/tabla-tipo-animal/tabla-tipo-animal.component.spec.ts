import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTipoAnimalComponent } from './tabla-tipo-animal.component';

describe('TablaTipoAnimalComponent', () => {
  let component: TablaTipoAnimalComponent;
  let fixture: ComponentFixture<TablaTipoAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaTipoAnimalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaTipoAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
