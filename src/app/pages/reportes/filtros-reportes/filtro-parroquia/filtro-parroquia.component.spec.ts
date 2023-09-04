import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroParroquiaComponent } from './filtro-parroquia.component';

describe('FiltroParroquiaComponent', () => {
  let component: FiltroParroquiaComponent;
  let fixture: ComponentFixture<FiltroParroquiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroParroquiaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroParroquiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
