import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueBalloonComponent } from './issue-balloon.component';

describe('IssueBalloonComponent', () => {
  let component: IssueBalloonComponent;
  let fixture: ComponentFixture<IssueBalloonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueBalloonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueBalloonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
