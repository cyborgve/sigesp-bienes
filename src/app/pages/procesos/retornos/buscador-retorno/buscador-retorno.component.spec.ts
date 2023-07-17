import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorRetornoComponent } from './buscador-retorno.component';

describe('BuscadorRetornoComponent', () => {
  let component: BuscadorRetornoComponent;
  let fixture: ComponentFixture<BuscadorRetornoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorRetornoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorRetornoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
