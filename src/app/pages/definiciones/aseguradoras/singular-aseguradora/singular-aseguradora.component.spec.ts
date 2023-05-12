import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularAseguradoraComponent } from './singular-aseguradora.component';

describe('SingularAseguradoraComponent', () => {
  let component: SingularAseguradoraComponent;
  let fixture: ComponentFixture<SingularAseguradoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularAseguradoraComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularAseguradoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
