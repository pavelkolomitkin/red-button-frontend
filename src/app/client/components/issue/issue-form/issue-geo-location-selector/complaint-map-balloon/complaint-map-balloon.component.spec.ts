import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintMapBalloonComponent } from './complaint-map-balloon.component';

describe('ComplaintMapBalloonComponent', () => {
  let component: ComplaintMapBalloonComponent;
  let fixture: ComponentFixture<ComplaintMapBalloonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintMapBalloonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintMapBalloonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
