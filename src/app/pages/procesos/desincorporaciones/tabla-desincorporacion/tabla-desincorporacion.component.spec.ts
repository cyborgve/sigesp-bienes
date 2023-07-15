import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDesincorporacionComponent } from './tabla-desincorporacion.component';

describe('TablaDesincorporacionComponent', () => {
  let component: TablaDesincorporacionComponent;
  let fixture: ComponentFixture<TablaDesincorporacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaDesincorporacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaDesincorporacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
