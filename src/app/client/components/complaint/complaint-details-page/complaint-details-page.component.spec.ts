import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintDetailsPageComponent } from './complaint-details-page.component';

describe('ComplaintDetailsPageComponent', () => {
  let component: ComplaintDetailsPageComponent;
  let fixture: ComponentFixture<ComplaintDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
