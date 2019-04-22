import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedComplaintPicturePreviewComponent } from './uploaded-complaint-picture-preview.component';

describe('UploadedComplaintPicturePreviewComponent', () => {
  let component: UploadedComplaintPicturePreviewComponent;
  let fixture: ComponentFixture<UploadedComplaintPicturePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadedComplaintPicturePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedComplaintPicturePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
