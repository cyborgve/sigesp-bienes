import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaModeloComponent } from './tabla-modelo.component';

describe('TablaModeloComponent', () => {
  let component: TablaModeloComponent;
  let fixture: ComponentFixture<TablaModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaModeloComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
