import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCommonWidgetComponent } from './dashboard-common-widget.component';

describe('DashboardCommonWidgetComponent', () => {
  let component: DashboardCommonWidgetComponent;
  let fixture: ComponentFixture<DashboardCommonWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCommonWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCommonWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
