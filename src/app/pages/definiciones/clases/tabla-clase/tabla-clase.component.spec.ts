import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaClaseComponent } from './tabla-clase.component';

describe('TablaClaseComponent', () => {
  let component: TablaClaseComponent;
  let fixture: ComponentFixture<TablaClaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaClaseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
