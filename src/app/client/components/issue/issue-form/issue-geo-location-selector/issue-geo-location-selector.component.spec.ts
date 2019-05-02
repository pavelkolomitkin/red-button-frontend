import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueGeoLocationSelectorComponent } from './issue-geo-location-selector.component';

describe('IssueGeoLocationSelectorComponent', () => {
  let component: IssueGeoLocationSelectorComponent;
  let fixture: ComponentFixture<IssueGeoLocationSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueGeoLocationSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueGeoLocationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
