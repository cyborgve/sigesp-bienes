import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorUsoComponent } from './buscador-uso.component';

describe('BuscadorUsoComponent', () => {
  let component: BuscadorUsoComponent;
  let fixture: ComponentFixture<BuscadorUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorUsoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
