import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueMapViewComponent } from './issue-map-view.component';

describe('IssueMapViewComponent', () => {
  let component: IssueMapViewComponent;
  let fixture: ComponentFixture<IssueMapViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueMapViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
