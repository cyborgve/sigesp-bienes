import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaIncorporacionComponent } from './tabla-incorporacion.component';

describe('TablaIncorporacionComponent', () => {
  let component: TablaIncorporacionComponent;
  let fixture: ComponentFixture<TablaIncorporacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaIncorporacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaIncorporacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
