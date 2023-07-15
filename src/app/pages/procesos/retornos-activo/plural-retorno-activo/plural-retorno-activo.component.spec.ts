import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralRetornoActivoComponent } from './plural-retorno-activo.component';

describe('PluralRetornoActivoComponent', () => {
  let component: PluralRetornoActivoComponent;
  let fixture: ComponentFixture<PluralRetornoActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralRetornoActivoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralRetornoActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
