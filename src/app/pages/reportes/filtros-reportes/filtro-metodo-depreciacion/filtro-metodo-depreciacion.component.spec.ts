import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroMetodoDepreciacionComponent } from './filtro-metodo-depreciacion.component';

describe('FiltroMetodoDepreciacionComponent', () => {
  let component: FiltroMetodoDepreciacionComponent;
  let fixture: ComponentFixture<FiltroMetodoDepreciacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroMetodoDepreciacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroMetodoDepreciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
