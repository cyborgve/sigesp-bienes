import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularComponenteActivoComponent } from './singular-componente-activo.component';

describe('SingularComponenteActivoComponent', () => {
  let component: SingularComponenteActivoComponent;
  let fixture: ComponentFixture<SingularComponenteActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularComponenteActivoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularComponenteActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
