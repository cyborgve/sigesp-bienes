import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSeguroComponent } from './tabla-seguro.component';

describe('TablaSeguroComponent', () => {
  let component: TablaSeguroComponent;
  let fixture: ComponentFixture<TablaSeguroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaSeguroComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
