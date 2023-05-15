import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralEstadoUsoComponent } from './plural-estado-uso.component';

describe('PluralEstadoUsoComponent', () => {
  let component: PluralEstadoUsoComponent;
  let fixture: ComponentFixture<PluralEstadoUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralEstadoUsoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralEstadoUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
