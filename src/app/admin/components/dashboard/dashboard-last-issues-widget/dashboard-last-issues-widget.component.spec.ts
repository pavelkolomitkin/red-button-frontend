import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLastIssuesWidgetComponent } from './dashboard-last-issues-widget.component';

describe('DashboardLastIssuesWidgetComponent', () => {
  let component: DashboardLastIssuesWidgetComponent;
  let fixture: ComponentFixture<DashboardLastIssuesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardLastIssuesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLastIssuesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
