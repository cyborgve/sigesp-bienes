import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaUnidadComponent } from './entrega-unidad.component';

describe('EntregaUnidadComponent', () => {
  let component: EntregaUnidadComponent;
  let fixture: ComponentFixture<EntregaUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntregaUnidadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
