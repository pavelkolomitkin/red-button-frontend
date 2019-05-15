import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {DatePeriod} from '../../data/model/date-period.model';

declare var $: any;


@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output('onChange') changeEvent: EventEmitter<DatePeriod> = new EventEmitter();


  @ViewChild('inputElement') inputElement: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    $(this.inputElement.nativeElement).off('apply.daterangepicker');
    $(this.inputElement.nativeElement).off('cancel.daterangepicker');
  }

  ngAfterViewInit(): void
  {
    $(this.inputElement.nativeElement).daterangepicker({
      autoUpdateInput: false,
      locale: {
        cancelLabel: 'Clear'
      }
    });

    const self = this;

    $(this.inputElement.nativeElement).on('apply.daterangepicker', function(ev, picker) {

      $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));

      const period: DatePeriod = new DatePeriod();
      period.startDate = picker.startDate.toDate();
      period.endDate = picker.endDate.toDate();

      self.changeEvent.emit(period);
    });

    $(this.inputElement.nativeElement).on('cancel.daterangepicker', function(ev, picker) {

      $(this).val('');

      self.changeEvent.emit(null);

    });
  }

}
