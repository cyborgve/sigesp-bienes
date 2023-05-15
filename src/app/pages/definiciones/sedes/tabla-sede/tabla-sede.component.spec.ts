import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSedeComponent } from './tabla-sede.component';

describe('TablaSedeComponent', () => {
  let component: TablaSedeComponent;
  let fixture: ComponentFixture<TablaSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaSedeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
