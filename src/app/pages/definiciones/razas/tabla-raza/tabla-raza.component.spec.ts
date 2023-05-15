import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaRazaComponent } from './tabla-raza.component';

describe('TablaRazaComponent', () => {
  let component: TablaRazaComponent;
  let fixture: ComponentFixture<TablaRazaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaRazaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaRazaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
