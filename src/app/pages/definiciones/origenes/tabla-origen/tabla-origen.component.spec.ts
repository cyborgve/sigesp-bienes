import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaOrigenComponent } from './tabla-origen.component';

describe('TablaOrigenComponent', () => {
  let component: TablaOrigenComponent;
  let fixture: ComponentFixture<TablaOrigenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaOrigenComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
