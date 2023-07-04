import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorEstadoComponent } from './buscador-estado.component';

describe('BuscadorEstadoComponent', () => {
  let component: BuscadorEstadoComponent;
  let fixture: ComponentFixture<BuscadorEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorEstadoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
