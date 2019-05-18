import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueGeographyPageComponent } from './issue-geography-page.component';

describe('IssueGeographyPageComponent', () => {
  let component: IssueGeographyPageComponent;
  let fixture: ComponentFixture<IssueGeographyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueGeographyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueGeographyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
