import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularMarcaComponent } from './singular-marca.component';

describe('SingularMarcaComponent', () => {
  let component: SingularMarcaComponent;
  let fixture: ComponentFixture<SingularMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularMarcaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
