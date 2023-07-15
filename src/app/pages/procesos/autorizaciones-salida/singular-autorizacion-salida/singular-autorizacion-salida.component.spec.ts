import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularAutorizacionSalidaComponent } from './singular-autorizacion-salida.component';

describe('SingularAutorizacionSalidaComponent', () => {
  let component: SingularAutorizacionSalidaComponent;
  let fixture: ComponentFixture<SingularAutorizacionSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularAutorizacionSalidaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularAutorizacionSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
