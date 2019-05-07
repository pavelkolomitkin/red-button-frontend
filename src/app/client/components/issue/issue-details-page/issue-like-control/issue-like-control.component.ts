import {Component, Input, OnInit} from '@angular/core';
import {Issue} from '../../../../../core/data/model/issue.model';
import {Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {IssueChangeLikeStart} from '../../../../data/issue.actions';

@Component({
  selector: 'app-issue-like-control',
  templateUrl: './issue-like-control.component.html',
  styleUrls: ['./issue-like-control.component.css']
})
export class IssueLikeControlComponent implements OnInit {

  _issue: Issue;

  isLoading: boolean = false;

  @Input()
  set issue(value: Issue)
  {
    this._issue = value;

    this.isLoading = false;
  }

  constructor(private store: Store<State>) { }

  ngOnInit() {

  }

  onLikeButtonClickHandler(event)
  {
    this.isLoading = true;
    const isLikeUp = !this._issue.hasUserLike;

    this.store.dispatch(new IssueChangeLikeStart(this._issue, isLikeUp));
  }

}
