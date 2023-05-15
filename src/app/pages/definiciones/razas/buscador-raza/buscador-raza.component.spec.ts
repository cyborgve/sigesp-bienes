import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorRazaComponent } from './buscador-raza.component';

describe('BuscadorRazaComponent', () => {
  let component: BuscadorRazaComponent;
  let fixture: ComponentFixture<BuscadorRazaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorRazaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorRazaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
