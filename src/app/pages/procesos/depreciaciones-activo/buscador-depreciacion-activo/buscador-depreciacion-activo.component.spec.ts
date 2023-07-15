import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorDepreciacionActivoComponent } from './buscador-depreciacion-activo.component';

describe('BuscadorDepreciacionActivoComponent', () => {
  let component: BuscadorDepreciacionActivoComponent;
  let fixture: ComponentFixture<BuscadorDepreciacionActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorDepreciacionActivoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorDepreciacionActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
