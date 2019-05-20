import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ServiceType} from '../../../../../core/data/model/service-type.model';
import {environment} from '../../../../../../environments/environment';

declare var $: any;

@Component({
  selector: 'app-analyst-service-type-percentage-item',
  templateUrl: './service-type-percentage-item.component.html',
  styleUrls: ['./service-type-percentage-item.component.css']
})
export class ServiceTypePercentageItemComponent implements OnInit, AfterViewInit {

  @ViewChild('inputElement') inputElementRef: ElementRef;

  @Input() serviceType: ServiceType;
  @Input() percentage: number;

  color: string;

  constructor() { }

  ngOnInit() {

    this.color = this.serviceType ? environment.serviceTypeColors[this.serviceType.code] : environment.serviceTypeColors.others;

  }

  ngAfterViewInit(): void {


    $(this.inputElementRef.nativeElement).knob({
      displayInput: true,
      readOnly: true
    });

    const element = this.inputElementRef.nativeElement;

    $({value: 0}).animate({value: this.percentage}, {
      duration: 300,
      easing:'swing',
      step: function()
      {
        $(element).val(Math.ceil(this.value)).trigger('change');
      }
    })
  }

}
