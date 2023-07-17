import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaRetornoComponent } from './tabla-retorno.component';

describe('TablaRetornoComponent', () => {
  let component: TablaRetornoComponent;
  let fixture: ComponentFixture<TablaRetornoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaRetornoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaRetornoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
