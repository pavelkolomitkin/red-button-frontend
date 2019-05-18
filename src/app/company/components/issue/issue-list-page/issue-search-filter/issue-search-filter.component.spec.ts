import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueSearchFilterComponent } from './issue-search-filter.component';

describe('IssueSearchFilterComponent', () => {
  let component: IssueSearchFilterComponent;
  let fixture: ComponentFixture<IssueSearchFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueSearchFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
