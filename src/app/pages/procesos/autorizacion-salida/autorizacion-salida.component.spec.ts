import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacionSalidaComponent } from './autorizacion-salida.component';

describe('AutorizacionSalidaComponent', () => {
  let component: AutorizacionSalidaComponent;
  let fixture: ComponentFixture<AutorizacionSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutorizacionSalidaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizacionSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
