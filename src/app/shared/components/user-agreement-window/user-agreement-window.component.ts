import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {select} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {GlobalUserAgreementVisibility} from '../../../core/data/actions';

@Component({
  selector: 'app-user-agreement-window',
  templateUrl: './user-agreement-window.component.html',
  styleUrls: ['./user-agreement-window.component.css']
})
export class UserAgreementWindowComponent implements OnInit, OnDestroy {

  @ViewChild('modalWindow') modalWindowTemplate: TemplateRef<any>;
  modalWindow: NgbModalRef = null;

  valueSubscription: Subscription;

  constructor(
      private modal: NgbModal,
      private store: Store<State>
  ) { }

  ngOnInit() {

    this.valueSubscription = this.store.pipe(select(state => state.core.isUserAgreementVisible)).subscribe((value) => {

      if (!!this.modalWindow)
      {
        this.modalWindow.close();
        this.modalWindow = null;
      }

      if (value)
      {
        this.modalWindow = this.modal.open(this.modalWindowTemplate, {centered: true});
        this.modalWindow.result
            .then((result) => {
              this.modalWindow = null;
              this.store.dispatch(new GlobalUserAgreementVisibility(false));
            }, () => {
              this.modalWindow = null;
              this.store.dispatch(new GlobalUserAgreementVisibility(false));
            });
      }
    });

  }

  ngOnDestroy(): void {

    this.valueSubscription.unsubscribe();

  }
}
