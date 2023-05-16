import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularTipoSemovienteComponent } from './singular-tipo-semoviente.component';

describe('SingularTipoSemovienteComponent', () => {
  let component: SingularTipoSemovienteComponent;
  let fixture: ComponentFixture<SingularTipoSemovienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularTipoSemovienteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularTipoSemovienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
