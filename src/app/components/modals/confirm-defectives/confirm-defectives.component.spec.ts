import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDefectivesComponent } from './confirm-defectives.component';

describe('ConfirmDefectivesComponent', () => {
  let component: ConfirmDefectivesComponent;
  let fixture: ComponentFixture<ConfirmDefectivesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDefectivesComponent]
    });
    fixture = TestBed.createComponent(ConfirmDefectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
