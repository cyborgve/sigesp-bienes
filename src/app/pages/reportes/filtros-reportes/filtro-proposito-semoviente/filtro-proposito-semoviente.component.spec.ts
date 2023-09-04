import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroPropositoSemovienteComponent } from './filtro-proposito-semoviente.component';

describe('FiltroPropositoSemovienteComponent', () => {
  let component: FiltroPropositoSemovienteComponent;
  let fixture: ComponentFixture<FiltroPropositoSemovienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroPropositoSemovienteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroPropositoSemovienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
