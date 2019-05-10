import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCompanySelectorFieldComponent } from './issue-company-selector-field.component';

describe('IssueCompanySelectorFieldComponent', () => {
  let component: IssueCompanySelectorFieldComponent;
  let fixture: ComponentFixture<IssueCompanySelectorFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueCompanySelectorFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueCompanySelectorFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
