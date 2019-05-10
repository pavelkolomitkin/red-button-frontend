import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueLikeControlComponent } from './issue-like-control.component';

describe('IssueLikeControlComponent', () => {
  let component: IssueLikeControlComponent;
  let fixture: ComponentFixture<IssueLikeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueLikeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueLikeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
