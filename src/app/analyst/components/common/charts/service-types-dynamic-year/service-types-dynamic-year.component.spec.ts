import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTypesDynamicYearComponent } from './service-types-dynamic-year.component';

describe('ServiceTypesDynamicYearComponent', () => {
  let component: ServiceTypesDynamicYearComponent;
  let fixture: ComponentFixture<ServiceTypesDynamicYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceTypesDynamicYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTypesDynamicYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
