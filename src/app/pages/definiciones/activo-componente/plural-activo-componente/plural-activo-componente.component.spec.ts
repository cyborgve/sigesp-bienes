import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralActivoComponenteComponent } from './plural-activo-componente.component';

describe('PluralActivoComponenteComponent', () => {
  let component: PluralActivoComponenteComponent;
  let fixture: ComponentFixture<PluralActivoComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralActivoComponenteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralActivoComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
