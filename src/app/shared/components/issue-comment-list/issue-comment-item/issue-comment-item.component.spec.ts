import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCommentItemComponent } from './issue-comment-item.component';

describe('IssueCommentItemComponent', () => {
  let component: IssueCommentItemComponent;
  let fixture: ComponentFixture<IssueCommentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueCommentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueCommentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
