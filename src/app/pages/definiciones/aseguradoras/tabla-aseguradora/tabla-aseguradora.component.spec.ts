import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAseguradoraComponent } from './tabla-aseguradora.component';

describe('TablaAseguradoraComponent', () => {
  let component: TablaAseguradoraComponent;
  let fixture: ComponentFixture<TablaAseguradoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaAseguradoraComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaAseguradoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
