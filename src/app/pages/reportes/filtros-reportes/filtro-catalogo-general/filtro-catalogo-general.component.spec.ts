import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroCatalogoGeneralComponent } from './filtro-catalogo-general.component';

describe('FiltroCatalogoGeneralComponent', () => {
  let component: FiltroCatalogoGeneralComponent;
  let fixture: ComponentFixture<FiltroCatalogoGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroCatalogoGeneralComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroCatalogoGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
