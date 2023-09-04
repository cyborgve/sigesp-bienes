import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroCentroCostoComponent } from './filtro-centro-costo.component';

describe('FiltroCentroCostoComponent', () => {
  let component: FiltroCentroCostoComponent;
  let fixture: ComponentFixture<FiltroCentroCostoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroCentroCostoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
