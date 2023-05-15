import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTipoEstructuraComponent } from './tabla-tipo-estructura.component';

describe('TablaTipoEstructuraComponent', () => {
  let component: TablaTipoEstructuraComponent;
  let fixture: ComponentFixture<TablaTipoEstructuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaTipoEstructuraComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaTipoEstructuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
