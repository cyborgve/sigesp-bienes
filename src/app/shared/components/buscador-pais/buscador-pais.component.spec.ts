import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorPaisComponent } from './buscador-pais.component';

describe('BuscadorPaisComponent', () => {
  let component: BuscadorPaisComponent;
  let fixture: ComponentFixture<BuscadorPaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorPaisComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
