import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralTipoSedeComponent } from './plural-tipo-sede.component';

describe('PluralTipoSedeComponent', () => {
  let component: PluralTipoSedeComponent;
  let fixture: ComponentFixture<PluralTipoSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralTipoSedeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralTipoSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
