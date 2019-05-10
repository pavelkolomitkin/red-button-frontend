import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueGeoLocationSelectorFieldComponent } from './issue-geo-location-selector-field.component';

describe('IssueGeoLocationSelectorFieldComponent', () => {
  let component: IssueGeoLocationSelectorFieldComponent;
  let fixture: ComponentFixture<IssueGeoLocationSelectorFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueGeoLocationSelectorFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueGeoLocationSelectorFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
