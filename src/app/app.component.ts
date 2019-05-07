import {AfterContentChecked, Component} from '@angular/core';
import {State} from './app.state';
import {select, Store} from '@ngrx/store';
import User from './core/data/model/user.model';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked
{
  ngAfterContentChecked(): void {
    //console.log('Fix layout...');
    $('body').layout('fix');
  }
}
