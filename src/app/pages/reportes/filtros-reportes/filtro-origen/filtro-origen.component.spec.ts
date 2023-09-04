import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroOrigenComponent } from './filtro-origen.component';

describe('FiltroOrigenComponent', () => {
  let component: FiltroOrigenComponent;
  let fixture: ComponentFixture<FiltroOrigenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroOrigenComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
