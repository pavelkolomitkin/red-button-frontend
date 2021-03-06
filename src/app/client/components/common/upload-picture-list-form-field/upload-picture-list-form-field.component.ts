import {ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Observable, OperatorFunction, Subscription} from 'rxjs';
import {UploadItem} from '../../../../shared/data/model/upload-item.model';
import {Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {GlobalNotifyErrorMessage} from '../../../../core/data/actions';
import {NotifyMessage} from '../../../../core/data/model/notify-message.model';
import {PictureInterface} from '../../../../shared/data/model/picture-interface.model';
import {filter} from 'rxjs/operators';
import {Lightbox} from 'ngx-lightbox';

export abstract class UploadPictureListFormFieldComponent implements OnInit, OnDestroy
{
    @Output('onChange') changeEvent: EventEmitter<Array<PictureInterface>> = new EventEmitter();
    @Output('onSelectError') selectErrorEvent: EventEmitter<string> = new EventEmitter();

    @Input() pictures: Array<PictureInterface> = [];

    lightBoxItems: Array<{ src: string, caption: string, thumb: string }> = [];

    @ViewChild('fileSelector') fileSelector: ElementRef;
    @ViewChild('removeAlertModal') removePictureModalWindowTemplate: TemplateRef<any>;
    removePictureModalWindow: NgbModalRef = null;

    uploadingFiles: Observable<Array<UploadItem<PictureInterface>>>;

    uploadSubscription: Subscription;

    protected constructor(protected store: Store<State>, protected modal: NgbModal, private lightBox: Lightbox)
    {
        this.uploadingFiles = this.store.pipe(this.getUploadingItemsSelect());

        this.uploadSubscription = this.store.pipe(
            this.getLastUploadItemsSelect(),
            filter(result => (result !== null))
        ).subscribe((item: UploadItem<PictureInterface>) => {

            this.pictures.push(item.uploaded);
            this.updateLightBoxItems();
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
        this.updateLightBoxItems();
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

                this.changeEvent.emit(this.pictures);
            }
            catch (error) {
                this.selectErrorEvent.emit(error);
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

                    this.changeEvent.emit(this.pictures);
                    this.updateLightBoxItems();
                }

                this.removePictureModalWindow = null;
            }, () => {
                this.removePictureModalWindow = null;
            });
    }

    updateLightBoxItems()
    {
        this.lightBoxItems = this.pictures.map((item) => {
            return {
                src: item.sources['previewNormal'] as string,
                caption: '',
                thumb: item.sources['previewMiddle'] as string
            }
        });
    }

    onPictureClickHandler(event, index)
    {
        this.lightBox.open(this.lightBoxItems, index);
    }
}
