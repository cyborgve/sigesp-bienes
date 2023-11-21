import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTipoResponsableComponent } from './filtro-tipo-responsable.component';

describe('FiltroTipoResponsableComponent', () => {
  let component: FiltroTipoResponsableComponent;
  let fixture: ComponentFixture<FiltroTipoResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroTipoResponsableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroTipoResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
