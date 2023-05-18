import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaComponenteActivoComponent } from './tabla-componente-activo.component';

describe('TablaComponenteActivoComponent', () => {
  let component: TablaComponenteActivoComponent;
  let fixture: ComponentFixture<TablaComponenteActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaComponenteActivoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaComponenteActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
