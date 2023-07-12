import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoActivosComponent } from './listado-activos.component';

describe('ListadoActivosComponent', () => {
  let component: ListadoActivosComponent;
  let fixture: ComponentFixture<ListadoActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoActivosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
