import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularCategoriaUnidadComponent } from './singular-categoria-unidad.component';

describe('SingularCategoriaUnidadComponent', () => {
  let component: SingularCategoriaUnidadComponent;
  let fixture: ComponentFixture<SingularCategoriaUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularCategoriaUnidadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularCategoriaUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
