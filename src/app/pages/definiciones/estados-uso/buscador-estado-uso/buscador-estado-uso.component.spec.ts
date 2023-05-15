import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorEstadoUsoComponent } from './buscador-estado-uso.component';

describe('BuscadorEstadoUsoComponent', () => {
  let component: BuscadorEstadoUsoComponent;
  let fixture: ComponentFixture<BuscadorEstadoUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorEstadoUsoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorEstadoUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
