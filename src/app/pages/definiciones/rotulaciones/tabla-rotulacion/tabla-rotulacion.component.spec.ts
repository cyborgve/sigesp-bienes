import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaRotulacionComponent } from './tabla-rotulacion.component';

describe('TablaRotulacionComponent', () => {
  let component: TablaRotulacionComponent;
  let fixture: ComponentFixture<TablaRotulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaRotulacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaRotulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
