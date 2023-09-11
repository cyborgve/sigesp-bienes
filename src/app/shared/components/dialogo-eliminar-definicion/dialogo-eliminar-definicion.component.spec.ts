import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoEliminarDefinicionComponent } from './dialogo-eliminar-definicion.component';

describe('DialogoEliminarDefinicionComponent', () => {
  let component: DialogoEliminarDefinicionComponent;
  let fixture: ComponentFixture<DialogoEliminarDefinicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogoEliminarDefinicionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoEliminarDefinicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
