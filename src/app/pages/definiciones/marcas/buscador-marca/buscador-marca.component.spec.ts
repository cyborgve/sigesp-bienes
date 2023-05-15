import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorMarcaComponent } from './buscador-marca.component';

describe('BuscadorMarcaComponent', () => {
  let component: BuscadorMarcaComponent;
  let fixture: ComponentFixture<BuscadorMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorMarcaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
