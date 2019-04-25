import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {ActionConfirmation} from '../../data/model/action-confirmation.model';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationActionOption} from '../../data/model/confirmation-action-option.model';

@Component({
  selector: 'app-confirmation-window',
  templateUrl: './confirmation-window.component.html',
  styleUrls: ['./confirmation-window.component.css']
})
export class ConfirmationWindowComponent implements OnInit {

  @Output('onConfirm') confirm: EventEmitter<ActionConfirmation> = new EventEmitter();

  @Input() confirmation: ActionConfirmation;


  @ViewChild('modalWindow') modalWindowTemplate: TemplateRef<any>;
  modalWindow: NgbModalRef = null;

  constructor(private modal: NgbModal) { }

  ngOnInit() {

    this.modalWindow = this.modal.open(this.modalWindowTemplate, {centered: true});
    this.modalWindow.result
        .then((result) => {


          this.modalWindow = null;
        }, () => {
          this.modalWindow = null;
        });
  }

  onActControlHandler(option: ConfirmationActionOption)
  {
    this.confirmation.userResponse = option;

    this.confirm.emit(this.confirmation);

    this.modalWindow.close();
  }
}
