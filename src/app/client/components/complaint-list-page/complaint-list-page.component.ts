import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {Complaint} from '../../data/model/complaint.model';
import {Subscription} from 'rxjs';
import {ComplaintUserListLoadStart, ComplaintUserListReset} from '../../data/complaint.actions';

@Component({
  selector: 'app-complaint-list-page',
  templateUrl: './complaint-list-page.component.html',
  styleUrls: ['./complaint-list-page.component.css']
})
export class ComplaintListPageComponent implements OnInit, OnDestroy {

  list: Array<Complaint> = [];
  currentPage = 1;

  isEmpty: boolean = false;

  listSubscription: Subscription;

  constructor(private store: Store<State>) {
    this.currentPage = 1;
    this.list = [];
  }

  ngOnInit() {

    //debugger
    this.currentPage = 1;
    this.list = [];

    this.store.dispatch(new ComplaintUserListReset());

    this.listSubscription = this.store.pipe(select(state => state.clientComplaint)).subscribe(
        ({ userComplaintList, userComplaintTotal }) => {

          //debugger
          if (this.currentPage === 1)
          {
            this.list = [];
          }

          this.list = this.list.concat(userComplaintList);

          this.isEmpty = (this.currentPage === 1) && (userComplaintTotal === 0);
        }
    );

    this.loadList();

  }

  ngOnDestroy(): void {

    this.listSubscription.unsubscribe();
  }

  onScroll = () => {
    this.currentPage++;
    this.loadList();
  }

  loadList = () =>
  {
    this.store.dispatch(new ComplaintUserListLoadStart(this.currentPage))
  }
}
