import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaUsoComponent } from './tabla-uso.component';

describe('TablaUsoComponent', () => {
  let component: TablaUsoComponent;
  let fixture: ComponentFixture<TablaUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaUsoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
