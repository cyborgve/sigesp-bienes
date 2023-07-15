import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralDepreciacionActivoComponent } from './plural-depreciacion-activo.component';

describe('PluralDepreciacionActivoComponent', () => {
  let component: PluralDepreciacionActivoComponent;
  let fixture: ComponentFixture<PluralDepreciacionActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralDepreciacionActivoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralDepreciacionActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
