import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorComponenteComponent } from './buscador-componente.component';

describe('BuscadorComponenteComponent', () => {
  let component: BuscadorComponenteComponent;
  let fixture: ComponentFixture<BuscadorComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorComponenteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
