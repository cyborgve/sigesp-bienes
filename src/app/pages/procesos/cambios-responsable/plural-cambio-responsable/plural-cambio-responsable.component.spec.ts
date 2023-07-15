import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralCambioResponsableComponent } from './plural-cambio-responsable.component';

describe('PluralCambioResponsableComponent', () => {
  let component: PluralCambioResponsableComponent;
  let fixture: ComponentFixture<PluralCambioResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralCambioResponsableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralCambioResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
