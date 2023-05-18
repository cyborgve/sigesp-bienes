import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralComponenteActivoComponent } from './plural-componente-activo.component';

describe('PluralComponenteActivoComponent', () => {
  let component: PluralComponenteActivoComponent;
  let fixture: ComponentFixture<PluralComponenteActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralComponenteActivoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralComponenteActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
