import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralActivoComponent } from './plural-activo.component';

describe('PluralActivoComponent', () => {
  let component: PluralActivoComponent;
  let fixture: ComponentFixture<PluralActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralActivoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
