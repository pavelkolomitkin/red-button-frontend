import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuePictureListFieldComponent } from './issue-picture-list-field.component';

describe('IssuePictureListFieldComponent', () => {
  let component: IssuePictureListFieldComponent;
  let fixture: ComponentFixture<IssuePictureListFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuePictureListFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuePictureListFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
