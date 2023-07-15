import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaModificacionComponent } from './tabla-modificacion.component';

describe('TablaModificacionComponent', () => {
  let component: TablaModificacionComponent;
  let fixture: ComponentFixture<TablaModificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaModificacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
