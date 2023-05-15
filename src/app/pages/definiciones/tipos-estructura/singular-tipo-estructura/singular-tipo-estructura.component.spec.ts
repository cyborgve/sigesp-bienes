import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularTipoEstructuraComponent } from './singular-tipo-estructura.component';

describe('SingularTipoEstructuraComponent', () => {
  let component: SingularTipoEstructuraComponent;
  let fixture: ComponentFixture<SingularTipoEstructuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularTipoEstructuraComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularTipoEstructuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
