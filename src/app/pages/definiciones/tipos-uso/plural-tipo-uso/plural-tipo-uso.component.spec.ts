import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralTipoUsoComponent } from './plural-tipo-uso.component';

describe('PluralTipoUsoComponent', () => {
  let component: PluralTipoUsoComponent;
  let fixture: ComponentFixture<PluralTipoUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralTipoUsoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralTipoUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
