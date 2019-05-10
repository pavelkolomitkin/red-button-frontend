import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueMapBalloonComponent } from './issue-map-balloon.component';

describe('IssueMapBalloonComponent', () => {
  let component: IssueMapBalloonComponent;
  let fixture: ComponentFixture<IssueMapBalloonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueMapBalloonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueMapBalloonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
