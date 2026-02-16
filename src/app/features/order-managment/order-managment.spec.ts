import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderManagment } from './order-managment';

describe('OrderManagment', () => {
  let component: OrderManagment;
  let fixture: ComponentFixture<OrderManagment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderManagment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderManagment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
