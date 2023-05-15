import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularModeloComponent } from './singular-modelo.component';

describe('SingularModeloComponent', () => {
  let component: SingularModeloComponent;
  let fixture: ComponentFixture<SingularModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularModeloComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
