import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintConfirmationViewBalloonComponent } from './complaint-confirmation-view-balloon.component';

describe('ComplaintConfirmationViewBalloonComponent', () => {
  let component: ComplaintConfirmationViewBalloonComponent;
  let fixture: ComponentFixture<ComplaintConfirmationViewBalloonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintConfirmationViewBalloonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintConfirmationViewBalloonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
