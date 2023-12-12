import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaIntegracionComponent } from './tabla-integracion.component';

describe('TablaIntegracionComponent', () => {
  let component: TablaIntegracionComponent;
  let fixture: ComponentFixture<TablaIntegracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaIntegracionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaIntegracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
