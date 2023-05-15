import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorClaseComponent } from './buscador-clase.component';

describe('BuscadorClaseComponent', () => {
  let component: BuscadorClaseComponent;
  let fixture: ComponentFixture<BuscadorClaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorClaseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
