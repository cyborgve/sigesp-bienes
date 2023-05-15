import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaColorComponent } from './tabla-color.component';

describe('TablaColorComponent', () => {
  let component: TablaColorComponent;
  let fixture: ComponentFixture<TablaColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaColorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
