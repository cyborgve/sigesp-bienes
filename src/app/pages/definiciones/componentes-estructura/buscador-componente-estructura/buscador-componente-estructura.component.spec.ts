import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorComponenteEstructuraComponent } from './buscador-componente-estructura.component';

describe('BuscadorComponenteEstructuraComponent', () => {
  let component: BuscadorComponenteEstructuraComponent;
  let fixture: ComponentFixture<BuscadorComponenteEstructuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorComponenteEstructuraComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorComponenteEstructuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
