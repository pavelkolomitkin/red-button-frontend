import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPicturePreviewComponent } from './upload-picture-preview.component';

describe('UploadPicturePreviewComponent', () => {
  let component: UploadPicturePreviewComponent;
  let fixture: ComponentFixture<UploadPicturePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPicturePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPicturePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
