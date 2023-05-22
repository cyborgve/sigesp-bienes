import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivoDocumentacionComponent } from './activo-documentacion.component';

describe('ActivoDocumentacionComponent', () => {
  let component: ActivoDocumentacionComponent;
  let fixture: ComponentFixture<ActivoDocumentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivoDocumentacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivoDocumentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
