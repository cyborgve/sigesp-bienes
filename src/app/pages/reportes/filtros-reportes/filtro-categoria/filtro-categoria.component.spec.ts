import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroCategoriaComponent } from './filtro-categoria.component';

describe('FiltroCategoriaComponent', () => {
  let component: FiltroCategoriaComponent;
  let fixture: ComponentFixture<FiltroCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroCategoriaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
