import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedPicturePreviewComponent } from './uploaded-picture-preview.component';

describe('UploadedPicturePreviewComponent', () => {
  let component: UploadedPicturePreviewComponent;
  let fixture: ComponentFixture<UploadedPicturePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadedPicturePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedPicturePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
