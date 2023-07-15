import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorIncorporacionComponent } from './buscador-incorporacion.component';

describe('BuscadorIncorporacionComponent', () => {
  let component: BuscadorIncorporacionComponent;
  let fixture: ComponentFixture<BuscadorIncorporacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorIncorporacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorIncorporacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
