import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralUnidadAdministrativaComponent } from './plural-unidad-administrativa.component';

describe('PluralUnidadAdministrativaComponent', () => {
  let component: PluralUnidadAdministrativaComponent;
  let fixture: ComponentFixture<PluralUnidadAdministrativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralUnidadAdministrativaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralUnidadAdministrativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
