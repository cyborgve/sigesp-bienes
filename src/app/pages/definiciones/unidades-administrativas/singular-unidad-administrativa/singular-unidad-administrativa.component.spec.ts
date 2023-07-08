import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularUnidadAdministrativaComponent } from './singular-unidad-administrativa.component';

describe('SingularUnidadAdministrativaComponent', () => {
  let component: SingularUnidadAdministrativaComponent;
  let fixture: ComponentFixture<SingularUnidadAdministrativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularUnidadAdministrativaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularUnidadAdministrativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
