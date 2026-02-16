import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartManagment } from './cart-managment';

describe('CartManagment', () => {
  let component: CartManagment;
  let fixture: ComponentFixture<CartManagment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartManagment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartManagment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
