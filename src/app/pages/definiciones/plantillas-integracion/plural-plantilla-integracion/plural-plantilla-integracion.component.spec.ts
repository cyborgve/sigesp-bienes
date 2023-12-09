import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralPlantillaIntegracionComponent } from './plural-plantilla-integracion.component';

describe('PluralPlantillaIntegracionComponent', () => {
  let component: PluralPlantillaIntegracionComponent;
  let fixture: ComponentFixture<PluralPlantillaIntegracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralPlantillaIntegracionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralPlantillaIntegracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
