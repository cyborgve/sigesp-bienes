import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorComponenteActivoComponent } from './buscador-componente-activo.component';

describe('BuscadorComponenteActivoComponent', () => {
  let component: BuscadorComponenteActivoComponent;
  let fixture: ComponentFixture<BuscadorComponenteActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorComponenteActivoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorComponenteActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
