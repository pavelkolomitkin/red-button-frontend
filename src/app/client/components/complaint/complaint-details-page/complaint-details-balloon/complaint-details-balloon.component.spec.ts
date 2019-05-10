import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintDetailsBalloonComponent } from './complaint-details-balloon.component';

describe('ComplaintDetailsBalloonComponent', () => {
  let component: ComplaintDetailsBalloonComponent;
  let fixture: ComponentFixture<ComplaintDetailsBalloonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintDetailsBalloonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintDetailsBalloonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
