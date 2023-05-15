import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorColorComponent } from './buscador-color.component';

describe('BuscadorColorComponent', () => {
  let component: BuscadorColorComponent;
  let fixture: ComponentFixture<BuscadorColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorColorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
