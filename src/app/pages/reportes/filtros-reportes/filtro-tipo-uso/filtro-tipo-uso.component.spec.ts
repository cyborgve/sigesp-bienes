import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTipoUsoComponent } from './filtro-tipo-uso.component';

describe('FiltroTipoUsoComponent', () => {
  let component: FiltroTipoUsoComponent;
  let fixture: ComponentFixture<FiltroTipoUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroTipoUsoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroTipoUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
