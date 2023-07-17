import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorDepreciacionComponent } from './buscador-depreciacion.component';

describe('BuscadorDepreciacionComponent', () => {
  let component: BuscadorDepreciacionComponent;
  let fixture: ComponentFixture<BuscadorDepreciacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorDepreciacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorDepreciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
