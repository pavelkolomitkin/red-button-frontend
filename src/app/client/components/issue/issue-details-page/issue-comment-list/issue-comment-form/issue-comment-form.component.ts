import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {IssueComment} from '../../../../../../core/data/model/issue-comment.model';

@Component({
  selector: 'app-issue-comment-form',
  templateUrl: './issue-comment-form.component.html',
  styleUrls: ['./issue-comment-form.component.css']
})
export class IssueCommentFormComponent implements OnInit {

  @Output('onSubmit') submitEvent: EventEmitter<IssueComment> = new EventEmitter();
  @Output('onCancel') cancelEvent: EventEmitter<IssueComment> = new EventEmitter();

  _comment: IssueComment;

  @Input()
  set comment(value: IssueComment)
  {
    this._comment = {...value};
  }

  @Input() errors;

  @Input() withCancel: boolean = false;

  constructor() { }

  ngOnInit() {
  }


  onSubmitHandler(form: NgForm)
  {
    this.submitEvent.emit(this._comment);
  }

  onCancelClickHandler(event)
  {
    this.cancelEvent.emit(this._comment);
  }

}
