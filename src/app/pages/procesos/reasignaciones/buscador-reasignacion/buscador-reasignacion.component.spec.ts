import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorReasignacionComponent } from './buscador-reasignacion.component';

describe('BuscadorReasignacionComponent', () => {
  let component: BuscadorReasignacionComponent;
  let fixture: ComponentFixture<BuscadorReasignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorReasignacionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorReasignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
