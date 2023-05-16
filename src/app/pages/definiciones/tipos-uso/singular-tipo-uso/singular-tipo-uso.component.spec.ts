import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularTipoUsoComponent } from './singular-tipo-uso.component';

describe('SingularTipoUsoComponent', () => {
  let component: SingularTipoUsoComponent;
  let fixture: ComponentFixture<SingularTipoUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularTipoUsoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularTipoUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
