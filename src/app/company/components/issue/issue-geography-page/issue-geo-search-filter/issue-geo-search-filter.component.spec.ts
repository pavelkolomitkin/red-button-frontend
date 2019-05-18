import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueGeoSearchFilterComponent } from './issue-geo-search-filter.component';

describe('IssueGeoSearchFilterComponent', () => {
  let component: IssueGeoSearchFilterComponent;
  let fixture: ComponentFixture<IssueGeoSearchFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueGeoSearchFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueGeoSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
