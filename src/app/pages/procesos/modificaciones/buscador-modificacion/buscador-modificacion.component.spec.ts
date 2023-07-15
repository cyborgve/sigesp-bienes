import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorModificacionComponent } from './buscador-modificacion.component';

describe('BuscadorModificacionComponent', () => {
  let component: BuscadorModificacionComponent;
  let fixture: ComponentFixture<BuscadorModificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorModificacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
