import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroResponsableComponent } from './filtro-responsable.component';

describe('FiltroResponsableComponent', () => {
  let component: FiltroResponsableComponent;
  let fixture: ComponentFixture<FiltroResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroResponsableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
