import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultIssueMarkComponent } from './default-issue-mark.component';

describe('DefaultIssueMarkComponent', () => {
  let component: DefaultIssueMarkComponent;
  let fixture: ComponentFixture<DefaultIssueMarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultIssueMarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultIssueMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
