import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorModeloComponent } from './buscador-modelo.component';

describe('BuscadorModeloComponent', () => {
  let component: BuscadorModeloComponent;
  let fixture: ComponentFixture<BuscadorModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorModeloComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
