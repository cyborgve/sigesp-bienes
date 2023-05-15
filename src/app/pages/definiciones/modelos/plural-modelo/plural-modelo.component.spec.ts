import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralModeloComponent } from './plural-modelo.component';

describe('PluralModeloComponent', () => {
  let component: PluralModeloComponent;
  let fixture: ComponentFixture<PluralModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralModeloComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
