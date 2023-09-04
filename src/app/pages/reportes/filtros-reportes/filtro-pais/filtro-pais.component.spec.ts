import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroPaisComponent } from './filtro-pais.component';

describe('FiltroPaisComponent', () => {
  let component: FiltroPaisComponent;
  let fixture: ComponentFixture<FiltroPaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroPaisComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
