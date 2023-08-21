import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobanteIncorporacionComponent } from './comprobante-incorporacion.component';

describe('ComprobanteIncorporacionComponent', () => {
  let component: ComprobanteIncorporacionComponent;
  let fixture: ComponentFixture<ComprobanteIncorporacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComprobanteIncorporacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobanteIncorporacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
