import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTypesStatisticsComponent } from './service-types-statistics.component';

describe('ServiceTypesStatisticsComponent', () => {
  let component: ServiceTypesStatisticsComponent;
  let fixture: ComponentFixture<ServiceTypesStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceTypesStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTypesStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
