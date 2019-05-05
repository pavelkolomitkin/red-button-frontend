import {ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Observable, OperatorFunction, Subscription} from 'rxjs';
import {UploadItem} from '../../../shared/data/model/upload-item.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {GlobalNotifyErrorMessage} from '../../../core/data/actions';
import {NotifyMessage} from '../../../core/data/model/notify-message.model';
import {PictureInterface} from '../../../shared/data/model/picture-interface.model';
import {filter} from 'rxjs/operators';

export abstract class UploadPictureListFormFieldComponent implements OnInit, OnDestroy
{
    @Input() pictures: Array<PictureInterface> = [];

    @ViewChild('fileSelector') fileSelector: ElementRef;
    @ViewChild('removeAlertModal') removePictureModalWindowTemplate: TemplateRef<any>;
    removePictureModalWindow: NgbModalRef = null;

    protected uploadingFiles: Observable<Array<UploadItem<PictureInterface>>>;

    uploadSubscription: Subscription;

    protected constructor(protected store: Store<State>, protected modal: NgbModal)
    {
        this.uploadingFiles = this.store.pipe(this.getUploadingItemsSelect());

        this.uploadSubscription = this.store.pipe(
            this.getLastUploadItemsSelect(),
            filter(result => (result !== null))
        ).subscribe((item: UploadItem<PictureInterface>) => {

            this.pictures.push(item.uploaded);

        });
    }

    protected getUploadingItemsSelect(): OperatorFunction<State, any>
    {
        throw 'You should override this method in a subclass!';
    }

    protected getLastUploadItemsSelect(): OperatorFunction<State, any>
    {
        throw 'You should override this method in a subclass!';
    }

    protected getMaxUploadFileSize(): number
    {
        return environment.maxUploadPictureSize;
    }

    protected getMaxUploadFileSizeLabel() : string
    {
        return environment.maxUploadPictureSizeLabel;
    }

    protected getUploadFileAllowedMimeTypes(): Array<string>
    {
        return environment.uploadPictureAllowedMimeTypes;
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
        const allowedMimeTimes = this.getUploadFileAllowedMimeTypes();
        if (!allowedMimeTimes.includes(file.type))
        {
            throw 'You can upload only images';
        }

        const maxFileSize = this.getMaxUploadFileSize();
        if (file.size > maxFileSize)
        {
            throw 'File is too large! ' + this.getMaxUploadFileSizeLabel() + ' is maximum';
        }
    }

    protected onFileSelectSuccess(item: UploadItem<PictureInterface>)
    {
        throw new Error('You should override this method in a subclass!');
    }


    onFilesSelectHandler(files: Array<File>)
    {
        for (let file of files)
        {
            try {
                this.validateFile(file);

                const uploadablePicture = new UploadItem<PictureInterface>(
                    (+new Date()).toString() + file.name, file
                );
                this.onFileSelectSuccess(uploadablePicture);
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

    onPictureDeleteHandler(picture: PictureInterface)
    {

        this.removePictureModalWindow = this.modal.open(this.removePictureModalWindowTemplate, {centered: true});
        this.removePictureModalWindow.result
            .then((result) => {
                const removingItemIndex = this.pictures.findIndex(item => picture.id === item.id);
                if (removingItemIndex !== -1)
                {
                    this.pictures.splice(removingItemIndex, 1);
                }

                this.removePictureModalWindow = null;
            }, () => {
                this.removePictureModalWindow = null;
            });
    }
}
