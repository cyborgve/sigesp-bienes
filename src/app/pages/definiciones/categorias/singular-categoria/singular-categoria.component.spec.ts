import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularCategoriaComponent } from './singular-categoria.component';

describe('SingularCategoriaComponent', () => {
  let component: SingularCategoriaComponent;
  let fixture: ComponentFixture<SingularCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularCategoriaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
