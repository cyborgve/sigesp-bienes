import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaRetornoActivoComponent } from './tabla-retorno-activo.component';

describe('TablaRetornoActivoComponent', () => {
  let component: TablaRetornoActivoComponent;
  let fixture: ComponentFixture<TablaRetornoActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaRetornoActivoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaRetornoActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
