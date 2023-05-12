import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralAseguradoraComponent } from './plural-aseguradora.component';

describe('PluralAseguradoraComponent', () => {
  let component: PluralAseguradoraComponent;
  let fixture: ComponentFixture<PluralAseguradoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluralAseguradoraComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralAseguradoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
