import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorRotulacionComponent } from './buscador-rotulacion.component';

describe('BuscadorRotulacionComponent', () => {
  let component: BuscadorRotulacionComponent;
  let fixture: ComponentFixture<BuscadorRotulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorRotulacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorRotulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
