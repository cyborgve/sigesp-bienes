import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralModificacionComponent } from './plural-modificacion.component';

describe('PluralModificacionComponent', () => {
  let component: PluralModificacionComponent;
  let fixture: ComponentFixture<PluralModificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralModificacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
