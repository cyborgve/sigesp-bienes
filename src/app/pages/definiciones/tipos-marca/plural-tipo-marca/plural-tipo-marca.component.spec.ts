import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralTipoMarcaComponent } from './plural-tipo-marca.component';

describe('PluralTipoMarcaComponent', () => {
  let component: PluralTipoMarcaComponent;
  let fixture: ComponentFixture<PluralTipoMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralTipoMarcaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralTipoMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
