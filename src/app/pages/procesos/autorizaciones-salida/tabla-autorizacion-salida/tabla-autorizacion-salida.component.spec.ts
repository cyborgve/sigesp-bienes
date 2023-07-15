import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAutorizacionSalidaComponent } from './tabla-autorizacion-salida.component';

describe('TablaAutorizacionSalidaComponent', () => {
  let component: TablaAutorizacionSalidaComponent;
  let fixture: ComponentFixture<TablaAutorizacionSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaAutorizacionSalidaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaAutorizacionSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
