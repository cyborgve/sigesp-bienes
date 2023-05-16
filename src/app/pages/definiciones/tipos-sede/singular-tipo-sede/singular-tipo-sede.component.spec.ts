import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularTipoSedeComponent } from './singular-tipo-sede.component';

describe('SingularTipoSedeComponent', () => {
  let component: SingularTipoSedeComponent;
  let fixture: ComponentFixture<SingularTipoSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularTipoSedeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularTipoSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
