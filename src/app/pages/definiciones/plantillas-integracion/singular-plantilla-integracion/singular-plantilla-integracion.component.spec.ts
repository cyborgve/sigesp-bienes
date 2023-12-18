import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularPlantillaIntegracionComponent } from './singular-plantilla-integracion.component';

describe('SingularPlantillaIntegracionComponent', () => {
  let component: SingularPlantillaIntegracionComponent;
  let fixture: ComponentFixture<SingularPlantillaIntegracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularPlantillaIntegracionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularPlantillaIntegracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
