import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralTipoPolizaComponent } from './plural-tipo-poliza.component';

describe('PluralTipoPolizaComponent', () => {
  let component: PluralTipoPolizaComponent;
  let fixture: ComponentFixture<PluralTipoPolizaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralTipoPolizaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralTipoPolizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
