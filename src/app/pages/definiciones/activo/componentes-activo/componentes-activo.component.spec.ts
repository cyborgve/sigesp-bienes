import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentesActivoComponent } from './componentes-activo.component';

describe('ComponentesActivoComponent', () => {
  let component: ComponentesActivoComponent;
  let fixture: ComponentFixture<ComponentesActivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentesActivoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentesActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
