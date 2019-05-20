import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTypeSharesChartComponent } from './service-type-shares-chart.component';

describe('ServiceTypeSharesChartComponent', () => {
  let component: ServiceTypeSharesChartComponent;
  let fixture: ComponentFixture<ServiceTypeSharesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceTypeSharesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTypeSharesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
