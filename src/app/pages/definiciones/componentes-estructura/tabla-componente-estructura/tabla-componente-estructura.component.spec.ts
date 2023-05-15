import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaComponenteEstructuraComponent } from './tabla-componente-estructura.component';

describe('TablaComponenteEstructuraComponent', () => {
  let component: TablaComponenteEstructuraComponent;
  let fixture: ComponentFixture<TablaComponenteEstructuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaComponenteEstructuraComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaComponenteEstructuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
