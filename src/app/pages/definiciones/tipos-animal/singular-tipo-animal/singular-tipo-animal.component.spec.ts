import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularTipoAnimalComponent } from './singular-tipo-animal.component';

describe('SingularTipoAnimalComponent', () => {
  let component: SingularTipoAnimalComponent;
  let fixture: ComponentFixture<SingularTipoAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularTipoAnimalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularTipoAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
