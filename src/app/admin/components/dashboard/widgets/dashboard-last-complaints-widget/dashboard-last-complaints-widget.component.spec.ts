import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLastComplaintsWidgetComponent } from './dashboard-last-complaints-widget.component';

describe('DashboardLastComplaintsWidgetComponent', () => {
  let component: DashboardLastComplaintsWidgetComponent;
  let fixture: ComponentFixture<DashboardLastComplaintsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardLastComplaintsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLastComplaintsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
