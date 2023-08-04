import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularCatalogoGeneralComponent } from './singular-catalogo-general.component';

describe('SingularCatalogoGeneralComponent', () => {
  let component: SingularCatalogoGeneralComponent;
  let fixture: ComponentFixture<SingularCatalogoGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularCatalogoGeneralComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularCatalogoGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
