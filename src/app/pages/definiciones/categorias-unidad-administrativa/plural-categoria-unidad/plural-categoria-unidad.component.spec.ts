import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralCategoriaUnidadComponent } from './plural-categoria-unidad.component';

describe('PluralCategoriaUnidadComponent', () => {
  let component: PluralCategoriaUnidadComponent;
  let fixture: ComponentFixture<PluralCategoriaUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralCategoriaUnidadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralCategoriaUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
