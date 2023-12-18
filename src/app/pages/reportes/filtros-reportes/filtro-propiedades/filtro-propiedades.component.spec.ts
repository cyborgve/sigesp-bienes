import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroPropiedadesComponent } from './filtro-propiedades.component';

describe('FiltroPropiedadesComponent', () => {
  let component: FiltroPropiedadesComponent;
  let fixture: ComponentFixture<FiltroPropiedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroPropiedadesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroPropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
