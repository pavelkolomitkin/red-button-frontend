import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLastIssueCommentsWidgetComponent } from './dashboard-last-issue-comments-widget.component';

describe('DashboardLastIssueCommentsWidgetComponent', () => {
  let component: DashboardLastIssueCommentsWidgetComponent;
  let fixture: ComponentFixture<DashboardLastIssueCommentsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardLastIssueCommentsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLastIssueCommentsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
