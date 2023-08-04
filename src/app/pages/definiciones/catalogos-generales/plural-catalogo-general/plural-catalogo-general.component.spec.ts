import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralCatalogoGeneralComponent } from './plural-catalogo-general.component';

describe('PluralCatalogoGeneralComponent', () => {
  let component: PluralCatalogoGeneralComponent;
  let fixture: ComponentFixture<PluralCatalogoGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralCatalogoGeneralComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralCatalogoGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
