import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaResponsableComponent } from './tabla-responsable.component';

describe('TablaResponsableComponent', () => {
  let component: TablaResponsableComponent;
  let fixture: ComponentFixture<TablaResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaResponsableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
