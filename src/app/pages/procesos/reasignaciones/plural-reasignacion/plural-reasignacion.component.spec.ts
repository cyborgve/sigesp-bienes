import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralReasignacionComponent } from './plural-reasignacion.component';

describe('PluralReasignacionComponent', () => {
  let component: PluralReasignacionComponent;
  let fixture: ComponentFixture<PluralReasignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralReasignacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralReasignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
