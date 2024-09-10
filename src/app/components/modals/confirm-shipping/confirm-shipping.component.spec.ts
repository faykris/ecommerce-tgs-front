import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmShippingComponent } from './confirm-shipping.component';

describe('ConfirmShippingComponent', () => {
  let component: ConfirmShippingComponent;
  let fixture: ComponentFixture<ConfirmShippingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmShippingComponent]
    });
    fixture = TestBed.createComponent(ConfirmShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
