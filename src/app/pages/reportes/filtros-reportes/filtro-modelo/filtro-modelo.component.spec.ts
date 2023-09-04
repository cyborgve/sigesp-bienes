import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroModeloComponent } from './filtro-modelo.component';

describe('FiltroModeloComponent', () => {
  let component: FiltroModeloComponent;
  let fixture: ComponentFixture<FiltroModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroModeloComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
