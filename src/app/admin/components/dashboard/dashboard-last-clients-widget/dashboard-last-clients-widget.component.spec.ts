import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLastClientsWidgetComponent } from './dashboard-last-clients-widget.component';

describe('DashboardLastClientsWidgetComponent', () => {
  let component: DashboardLastClientsWidgetComponent;
  let fixture: ComponentFixture<DashboardLastClientsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardLastClientsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLastClientsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
