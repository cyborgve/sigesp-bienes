import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorSedeComponent } from './buscador-sede.component';

describe('BuscadorSedeComponent', () => {
  let component: BuscadorSedeComponent;
  let fixture: ComponentFixture<BuscadorSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorSedeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
