import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoItemFormFieldComponent } from './video-item-form-field.component';

describe('VideoItemFormFieldComponent', () => {
  let component: VideoItemFormFieldComponent;
  let fixture: ComponentFixture<VideoItemFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoItemFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoItemFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
