import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroMarcaComponent } from './filtro-marca.component';

describe('FiltroMarcaComponent', () => {
  let component: FiltroMarcaComponent;
  let fixture: ComponentFixture<FiltroMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroMarcaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
