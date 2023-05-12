import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorAseguradoraComponent } from './buscador-aseguradora.component';

describe('BuscadorAseguradoraComponent', () => {
  let component: BuscadorAseguradoraComponent;
  let fixture: ComponentFixture<BuscadorAseguradoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorAseguradoraComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorAseguradoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
