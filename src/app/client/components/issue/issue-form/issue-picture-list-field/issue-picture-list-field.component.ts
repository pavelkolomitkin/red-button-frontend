import {Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {UploadPictureListFormFieldComponent} from '../../../common/upload-picture-list-form-field/upload-picture-list-form-field.component';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {UploadItem} from '../../../../../shared/data/model/upload-item.model';
import {PictureInterface} from '../../../../../shared/data/model/picture-interface.model';
import {IssuePictureUploadReset, IssuePictureUploadSelect} from '../../../../data/issue-picture.actions';
import {OperatorFunction} from 'rxjs';
import {Lightbox} from 'ngx-lightbox';

@Component({
  selector: 'app-issue-picture-list-field',
  templateUrl: './issue-picture-list-field.component.html',
  styleUrls: ['./issue-picture-list-field.component.css']
})
export class IssuePictureListFieldComponent extends UploadPictureListFormFieldComponent implements OnInit
{
  constructor(store: Store<State>, modal: NgbModal, lightBox: Lightbox)
  {

    store.dispatch(new IssuePictureUploadReset());

    super(store, modal, lightBox);

  }

  protected getUploadingItemsSelect(): OperatorFunction<State, any>
  {
    return select(state => state.clientIssuePicture.uploadingFileSet);
  }

  protected getLastUploadItemsSelect(): OperatorFunction<State, any>
  {
    return select(state => state.clientIssuePicture.lastUploadCompletedItem);
  }

  protected onFileSelectSuccess(item: UploadItem<PictureInterface>)
  {
    this.store.dispatch(new IssuePictureUploadSelect(item));
  }

}
