import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioResponsableComponent } from './cambio-responsable.component';

describe('CambioResponsableComponent', () => {
  let component: CambioResponsableComponent;
  let fixture: ComponentFixture<CambioResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CambioResponsableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
