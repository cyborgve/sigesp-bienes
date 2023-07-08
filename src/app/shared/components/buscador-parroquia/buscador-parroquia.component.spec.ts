import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorParroquiaComponent } from './buscador-parroquia.component';

describe('BuscadorParroquiaComponent', () => {
  let component: BuscadorParroquiaComponent;
  let fixture: ComponentFixture<BuscadorParroquiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorParroquiaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorParroquiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
