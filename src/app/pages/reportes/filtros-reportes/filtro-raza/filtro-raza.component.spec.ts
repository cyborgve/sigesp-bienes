import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroRazaComponent } from './filtro-raza.component';

describe('FiltroRazaComponent', () => {
  let component: FiltroRazaComponent;
  let fixture: ComponentFixture<FiltroRazaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroRazaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroRazaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
