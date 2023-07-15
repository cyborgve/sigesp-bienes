import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralAutorizacionSalidaComponent } from './plural-autorizacion-salida.component';

describe('PluralAutorizacionSalidaComponent', () => {
  let component: PluralAutorizacionSalidaComponent;
  let fixture: ComponentFixture<PluralAutorizacionSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralAutorizacionSalidaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralAutorizacionSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
