import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAseguradoraComponent } from './filtro-aseguradora.component';

describe('FiltroAseguradoraComponent', () => {
  let component: FiltroAseguradoraComponent;
  let fixture: ComponentFixture<FiltroAseguradoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroAseguradoraComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAseguradoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
