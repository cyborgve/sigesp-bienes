import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentesProcesoComponent } from './componentes-proceso.component';

describe('ComponentesProcesoComponent', () => {
  let component: ComponentesProcesoComponent;
  let fixture: ComponentFixture<ComponentesProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComponentesProcesoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentesProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
