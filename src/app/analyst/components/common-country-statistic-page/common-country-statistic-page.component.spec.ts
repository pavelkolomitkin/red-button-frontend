import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonCountryStatisticPageComponent } from './common-country-statistic-page.component';

describe('CommonCountryStatisticPageComponent', () => {
  let component: CommonCountryStatisticPageComponent;
  let fixture: ComponentFixture<CommonCountryStatisticPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonCountryStatisticPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonCountryStatisticPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
