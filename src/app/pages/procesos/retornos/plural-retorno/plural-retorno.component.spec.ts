import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralRetornoComponent } from './plural-retorno.component';

describe('PluralRetornoComponent', () => {
  let component: PluralRetornoComponent;
  let fixture: ComponentFixture<PluralRetornoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralRetornoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralRetornoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
