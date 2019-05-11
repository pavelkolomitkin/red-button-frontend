import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueListPageComponent } from './issue-list-page.component';

describe('IssueListPageComponent', () => {
  let component: IssueListPageComponent;
  let fixture: ComponentFixture<IssueListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
