import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCommentFormComponent } from './issue-comment-form.component';

describe('IssueCommentFormComponent', () => {
  let component: IssueCommentFormComponent;
  let fixture: ComponentFixture<IssueCommentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueCommentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
