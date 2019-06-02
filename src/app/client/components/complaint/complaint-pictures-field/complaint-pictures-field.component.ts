import {Component, OnInit} from '@angular/core';
import {UploadItem} from '../../../../shared/data/model/upload-item.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {ComplaintPictureUploadReset, ComplaintPictureUploadSelect} from '../../../data/complaint-picture.actions';
import {OperatorFunction} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UploadPictureListFormFieldComponent} from '../../common/upload-picture-list-form-field/upload-picture-list-form-field.component';
import {PictureInterface} from '../../../../shared/data/model/picture-interface.model';
import {Lightbox} from 'ngx-lightbox';

@Component({
  selector: 'app-complaint-pictures-field',
  templateUrl: './complaint-pictures-field.component.html',
  styleUrls: ['./complaint-pictures-field.component.css']
})
export class ComplaintPicturesFieldComponent extends UploadPictureListFormFieldComponent implements OnInit
{
  constructor(store: Store<State>, modal: NgbModal, lightBox: Lightbox) {

    store.dispatch(new ComplaintPictureUploadReset());

    super(store, modal, lightBox);
  }

  protected getUploadingItemsSelect(): OperatorFunction<State, any>
  {
    return select(state => state.clientComplaintPicture.uploadingFileSet);
  }

  protected getLastUploadItemsSelect(): OperatorFunction<State, any>
  {
    return select(state => state.clientComplaintPicture.lastUploadCompletedItem);
  }

  protected onFileSelectSuccess(item: UploadItem<PictureInterface>)
  {
    this.store.dispatch(new ComplaintPictureUploadSelect(item));
  }
}
