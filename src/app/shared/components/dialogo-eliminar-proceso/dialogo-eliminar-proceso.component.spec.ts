import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoEliminarProcesoComponent } from './dialogo-eliminar-proceso.component';

describe('DialogoEliminarProcesoComponent', () => {
  let component: DialogoEliminarProcesoComponent;
  let fixture: ComponentFixture<DialogoEliminarProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogoEliminarProcesoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoEliminarProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
