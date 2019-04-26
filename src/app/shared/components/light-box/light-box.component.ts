import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-light-box',
  templateUrl: './light-box.component.html',
  styleUrls: ['./light-box.component.css']
})
export class LightBoxComponent implements OnInit {

  @Input() isVisible: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onOverlayClickHandler(event)
  {
    this.isVisible = false;
  }
}
