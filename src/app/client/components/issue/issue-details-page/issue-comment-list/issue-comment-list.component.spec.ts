import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCommentListComponent } from './issue-comment-list.component';

describe('IssueCommentListComponent', () => {
  let component: IssueCommentListComponent;
  let fixture: ComponentFixture<IssueCommentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueCommentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueCommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
