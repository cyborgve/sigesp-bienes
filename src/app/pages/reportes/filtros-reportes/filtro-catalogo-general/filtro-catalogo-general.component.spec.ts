import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroCatalogoCuentasComponent } from './filtro-catalogo-general.component';

describe('FiltroCatalogoCuentasComponent', () => {
  let component: FiltroCatalogoCuentasComponent;
  let fixture: ComponentFixture<FiltroCatalogoCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroCatalogoCuentasComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroCatalogoCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
