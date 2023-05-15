import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralTipoEstructuraComponent } from './plural-tipo-estructura.component';

describe('PluralTipoEstructuraComponent', () => {
  let component: PluralTipoEstructuraComponent;
  let fixture: ComponentFixture<PluralTipoEstructuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralTipoEstructuraComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralTipoEstructuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
