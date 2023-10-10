import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCorrelativoComponent } from './buscador-correlativo.component';

describe('BuscadorCorrelativoComponent', () => {
  let component: BuscadorCorrelativoComponent;
  let fixture: ComponentFixture<BuscadorCorrelativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorCorrelativoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorCorrelativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
