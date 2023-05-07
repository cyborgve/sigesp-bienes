import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivoComponentesComponent } from './activo-componentes.component';

describe('ActivoComponentesComponent', () => {
  let component: ActivoComponentesComponent;
  let fixture: ComponentFixture<ActivoComponentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivoComponentesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivoComponentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
