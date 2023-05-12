import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaActivoComponenteComponent } from './tabla-activo-componente.component';

describe('TablaActivoComponenteComponent', () => {
  let component: TablaActivoComponenteComponent;
  let fixture: ComponentFixture<TablaActivoComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaActivoComponenteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaActivoComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
