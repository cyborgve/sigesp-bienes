import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularTipoComponenteComponent } from './singular-tipo-componente.component';

describe('SingularTipoComponenteComponent', () => {
  let component: SingularTipoComponenteComponent;
  let fixture: ComponentFixture<SingularTipoComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularTipoComponenteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularTipoComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
