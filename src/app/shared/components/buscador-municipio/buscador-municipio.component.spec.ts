import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorMunicipioComponent } from './buscador-municipio.component';

describe('BuscadorMunicipioComponent', () => {
  let component: BuscadorMunicipioComponent;
  let fixture: ComponentFixture<BuscadorMunicipioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorMunicipioComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorMunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
