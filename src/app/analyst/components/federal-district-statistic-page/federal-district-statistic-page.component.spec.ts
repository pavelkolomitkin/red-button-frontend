import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FederalDistrictStatisticPageComponent } from './federal-district-statistic-page.component';

describe('FederalDistrictStatisticPageComponent', () => {
  let component: FederalDistrictStatisticPageComponent;
  let fixture: ComponentFixture<FederalDistrictStatisticPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FederalDistrictStatisticPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FederalDistrictStatisticPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
