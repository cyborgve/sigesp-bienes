import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcabezadoDeficinionComponent } from './ecabezado-deficinion.component';

describe('EcabezadoDeficinionComponent', () => {
  let component: EcabezadoDeficinionComponent;
  let fixture: ComponentFixture<EcabezadoDeficinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EcabezadoDeficinionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcabezadoDeficinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
