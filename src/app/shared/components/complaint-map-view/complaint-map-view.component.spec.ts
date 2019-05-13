import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintMapViewComponent } from './complaint-map-view.component';

describe('ComplaintMapViewComponent', () => {
  let component: ComplaintMapViewComponent;
  let fixture: ComponentFixture<ComplaintMapViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintMapViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
