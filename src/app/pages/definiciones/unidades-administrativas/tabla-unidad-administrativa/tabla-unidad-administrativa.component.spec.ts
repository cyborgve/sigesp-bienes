import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaUnidadAdministrativaComponent } from './tabla-unidad-administrativa.component';

describe('TablaUnidadAdministrativaComponent', () => {
  let component: TablaUnidadAdministrativaComponent;
  let fixture: ComponentFixture<TablaUnidadAdministrativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaUnidadAdministrativaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaUnidadAdministrativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
