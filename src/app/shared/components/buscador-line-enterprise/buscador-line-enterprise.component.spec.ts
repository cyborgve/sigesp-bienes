import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorLineEnterpriseComponent } from './buscador-line-enterprise.component';

describe('BuscadorLineEnterpriseComponent', () => {
  let component: BuscadorLineEnterpriseComponent;
  let fixture: ComponentFixture<BuscadorLineEnterpriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorLineEnterpriseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorLineEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
