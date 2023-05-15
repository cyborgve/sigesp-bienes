import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorSeguroComponent } from './buscador-seguro.component';

describe('BuscadorSeguroComponent', () => {
  let component: BuscadorSeguroComponent;
  let fixture: ComponentFixture<BuscadorSeguroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorSeguroComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
