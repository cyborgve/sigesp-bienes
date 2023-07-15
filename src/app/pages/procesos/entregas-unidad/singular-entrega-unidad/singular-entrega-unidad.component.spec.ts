import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularEntregaUnidadComponent } from './singular-entrega-unidad.component';

describe('SingularEntregaUnidadComponent', () => {
  let component: SingularEntregaUnidadComponent;
  let fixture: ComponentFixture<SingularEntregaUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularEntregaUnidadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularEntregaUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
