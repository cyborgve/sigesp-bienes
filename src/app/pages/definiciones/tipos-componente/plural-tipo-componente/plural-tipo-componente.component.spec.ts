import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralTipoComponenteComponent } from './plural-tipo-componente.component';

describe('PluralTipoComponenteComponent', () => {
  let component: PluralTipoComponenteComponent;
  let fixture: ComponentFixture<PluralTipoComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralTipoComponenteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralTipoComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
