import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralTipoAnimalComponent } from './plural-tipo-animal.component';

describe('PluralTipoAnimalComponent', () => {
  let component: PluralTipoAnimalComponent;
  let fixture: ComponentFixture<PluralTipoAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralTipoAnimalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralTipoAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
