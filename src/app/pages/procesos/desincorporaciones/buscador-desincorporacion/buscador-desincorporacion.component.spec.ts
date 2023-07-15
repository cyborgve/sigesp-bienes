import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorDesincorporacionComponent } from './buscador-desincorporacion.component';

describe('BuscadorDesincorporacionComponent', () => {
  let component: BuscadorDesincorporacionComponent;
  let fixture: ComponentFixture<BuscadorDesincorporacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorDesincorporacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorDesincorporacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
