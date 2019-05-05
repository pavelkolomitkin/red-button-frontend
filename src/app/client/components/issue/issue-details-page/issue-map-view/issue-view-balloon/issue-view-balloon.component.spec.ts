import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueViewBalloonComponent } from './issue-view-balloon.component';

describe('IssueViewBalloonComponent', () => {
  let component: IssueViewBalloonComponent;
  let fixture: ComponentFixture<IssueViewBalloonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueViewBalloonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueViewBalloonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
