import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UploadItem} from '../../../shared/data/model/upload-item.model';
import {ComplaintPicture} from '../../data/model/complaint-picture.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {ComplaintPictureUploadReset, ComplaintPictureUploadSelect} from '../../data/complaint-picture.actions';
import {GlobalNotifyErrorMessage} from '../../../core/data/actions';
import {NotifyMessage} from '../../../core/data/model/notify-message.model';
import {Observable, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Complaint} from '../../data/model/complaint.model';

@Component({
  selector: 'app-complaint-pictures-field',
  templateUrl: './complaint-pictures-field.component.html',
  styleUrls: ['./complaint-pictures-field.component.css']
})
export class ComplaintPicturesFieldComponent implements OnInit, OnDestroy {

  static MAX_UPLOAD_FILE_SIZE = 5242880;

  static ALLOWED_MIME_TYPES = [
    'image/jpeg', 'image/png'
  ];

  @Input() complaint: Complaint;

  @ViewChild('fileSelector') fileSelector: ElementRef;

  uploadingFiles: Observable<Array<UploadItem<ComplaintPicture>>>;

  uploadSubscription: Subscription;

  constructor(private store: Store<State>) {

    this.store.dispatch(new ComplaintPictureUploadReset());

    this.uploadingFiles = this.store.pipe(select(state => state.clientComplaintPicture.uploadingFileSet));

    this.uploadSubscription = this.store.pipe(
        select(state => state.clientComplaintPicture.lastUploadCompletedItem),
        filter(result => (result !== null))
    ).subscribe((item: UploadItem<ComplaintPicture>) => {

      this.complaint.pictures.push(item.uploaded);

    });

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (!!this.uploadSubscription)
    {
      this.uploadSubscription.unsubscribe();
    }
  }


  validateFile(file: File)
  {
    if (!ComplaintPicturesFieldComponent.ALLOWED_MIME_TYPES.includes(file.type))
    {
      throw 'You can upload only images';
    }
    if (file.size > ComplaintPicturesFieldComponent.MAX_UPLOAD_FILE_SIZE)
    {
      throw 'File is too large! 5M is maximum';
    }
  }

  onFilesSelectHandler(files: Array<File>)
  {
    for (let file of files)
    {
      try {
        this.validateFile(file);

        const uploadablePicture = new UploadItem<ComplaintPicture>(
            (+new Date()).toString() + file.name, file
        );

        this.store.dispatch(new ComplaintPictureUploadSelect(uploadablePicture));
      }
      catch (error) {
        this.store.dispatch(new GlobalNotifyErrorMessage(new NotifyMessage(error)));
      }
    }

    this.resetFileSelector();
  }

  resetFileSelector()
  {
    this.fileSelector.nativeElement.value = "";
  }

  onPictureDeleteHandler(picture: ComplaintPicture)
  {
    console.log('Deleting picture');
    console.log(picture);
  }
}
