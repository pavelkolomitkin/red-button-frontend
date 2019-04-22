import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintVideoListFieldComponent } from './complaint-video-list-field.component';

describe('ComplaintVideoListFieldComponent', () => {
  let component: ComplaintVideoListFieldComponent;
  let fixture: ComponentFixture<ComplaintVideoListFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintVideoListFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintVideoListFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
