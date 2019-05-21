import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTypePercentagesComponent } from './service-type-percentages.component';

describe('ServiceTypePercentagesComponent', () => {
  let component: ServiceTypePercentagesComponent;
  let fixture: ComponentFixture<ServiceTypePercentagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceTypePercentagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTypePercentagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
