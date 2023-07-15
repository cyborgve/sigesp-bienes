import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaReasignacionComponent } from './tabla-reasignacion.component';

describe('TablaReasignacionComponent', () => {
  let component: TablaReasignacionComponent;
  let fixture: ComponentFixture<TablaReasignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaReasignacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaReasignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
