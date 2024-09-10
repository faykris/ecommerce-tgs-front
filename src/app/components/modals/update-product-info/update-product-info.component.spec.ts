import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductInfoComponent } from './update-product-info.component';

describe('UpdateProductInfoComponent', () => {
  let component: UpdateProductInfoComponent;
  let fixture: ComponentFixture<UpdateProductInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProductInfoComponent]
    });
    fixture = TestBed.createComponent(UpdateProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
