import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroCuentaContableComponent } from './filtro-cuenta-contable.component';

describe('FiltroCuentaContableComponent', () => {
  let component: FiltroCuentaContableComponent;
  let fixture: ComponentFixture<FiltroCuentaContableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroCuentaContableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroCuentaContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
