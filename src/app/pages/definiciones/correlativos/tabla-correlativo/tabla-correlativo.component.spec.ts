import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCorrelativoComponent } from './tabla-correlativo.component';

describe('TablaCorrelativoComponent', () => {
  let component: TablaCorrelativoComponent;
  let fixture: ComponentFixture<TablaCorrelativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaCorrelativoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCorrelativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
