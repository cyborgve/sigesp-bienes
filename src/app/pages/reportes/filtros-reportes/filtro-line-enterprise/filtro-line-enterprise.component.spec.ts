import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroLineEnterpriseComponent } from './filtro-line-enterprise.component';

describe('FiltroLineEnterpriseComponent', () => {
  let component: FiltroLineEnterpriseComponent;
  let fixture: ComponentFixture<FiltroLineEnterpriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroLineEnterpriseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroLineEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
