import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorResponsableComponent } from './buscador-responsable.component';

describe('BuscadorResponsableComponent', () => {
  let component: BuscadorResponsableComponent;
  let fixture: ComponentFixture<BuscadorResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorResponsableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
