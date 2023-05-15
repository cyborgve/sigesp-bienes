import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralMarcaComponent } from './plural-marca.component';

describe('PluralMarcaComponent', () => {
  let component: PluralMarcaComponent;
  let fixture: ComponentFixture<PluralMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralMarcaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
