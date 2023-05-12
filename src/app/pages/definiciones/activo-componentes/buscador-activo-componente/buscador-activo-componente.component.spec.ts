import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorActivoComponenteComponent } from './buscador-activo-componente.component';

describe('BuscadorActivoComponenteComponent', () => {
  let component: BuscadorActivoComponenteComponent;
  let fixture: ComponentFixture<BuscadorActivoComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorActivoComponenteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorActivoComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
