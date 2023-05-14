import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralCategoriaComponent } from './plural-categoria.component';

describe('PluralCategoriaComponent', () => {
  let component: PluralCategoriaComponent;
  let fixture: ComponentFixture<PluralCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralCategoriaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
