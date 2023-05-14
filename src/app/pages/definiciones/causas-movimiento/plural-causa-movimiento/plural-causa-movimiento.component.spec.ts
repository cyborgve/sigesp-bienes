import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralCausaMovimientoComponent } from './plural-causa-movimiento.component';

describe('PluralCausaMovimientoComponent', () => {
  let component: PluralCausaMovimientoComponent;
  let fixture: ComponentFixture<PluralCausaMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralCausaMovimientoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralCausaMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
