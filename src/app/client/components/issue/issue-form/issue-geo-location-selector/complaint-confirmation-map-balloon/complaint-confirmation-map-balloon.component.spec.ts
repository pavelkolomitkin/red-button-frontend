import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintConfirmationMapBalloonComponent } from './complaint-confirmation-map-balloon.component';

describe('ComplaintConfirmationMapBalloonComponent', () => {
  let component: ComplaintConfirmationMapBalloonComponent;
  let fixture: ComponentFixture<ComplaintConfirmationMapBalloonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintConfirmationMapBalloonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintConfirmationMapBalloonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
