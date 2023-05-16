import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularTipoPolizaComponent } from './singular-tipo-poliza.component';

describe('SingularTipoPolizaComponent', () => {
  let component: SingularTipoPolizaComponent;
  let fixture: ComponentFixture<SingularTipoPolizaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularTipoPolizaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularTipoPolizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
