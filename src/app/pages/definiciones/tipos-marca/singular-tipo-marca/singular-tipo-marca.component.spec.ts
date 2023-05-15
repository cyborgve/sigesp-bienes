import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularTipoMarcaComponent } from './singular-tipo-marca.component';

describe('SingularTipoMarcaComponent', () => {
  let component: SingularTipoMarcaComponent;
  let fixture: ComponentFixture<SingularTipoMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularTipoMarcaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularTipoMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
