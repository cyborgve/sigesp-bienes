import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorOrigenComponent } from './buscador-origen.component';

describe('BuscadorOrigenComponent', () => {
  let component: BuscadorOrigenComponent;
  let fixture: ComponentFixture<BuscadorOrigenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorOrigenComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
