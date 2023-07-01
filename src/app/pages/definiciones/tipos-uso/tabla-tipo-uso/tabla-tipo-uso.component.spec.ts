import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTipoUsoComponent } from './tabla-tipo-uso.component';

describe('TablaTipoUsoComponent', () => {
  let component: TablaTipoUsoComponent;
  let fixture: ComponentFixture<TablaTipoUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaTipoUsoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaTipoUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
