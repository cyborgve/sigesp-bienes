import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCiudadComponent } from './buscador-ciudad.component';

describe('BuscadorCiudadComponent', () => {
  let component: BuscadorCiudadComponent;
  let fixture: ComponentFixture<BuscadorCiudadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorCiudadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorCiudadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
