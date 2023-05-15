import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularCondicionCompraComponent } from './singular-condicion-compra.component';

describe('SingularCondicionCompraComponent', () => {
  let component: SingularCondicionCompraComponent;
  let fixture: ComponentFixture<SingularCondicionCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularCondicionCompraComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularCondicionCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
