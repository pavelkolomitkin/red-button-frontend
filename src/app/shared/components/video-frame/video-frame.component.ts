import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Video} from '../../../core/data/model/video.model';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-video-frame',
  templateUrl: './video-frame.component.html',
  styleUrls: ['./video-frame.component.css']
})
export class VideoFrameComponent implements OnInit, AfterViewInit {

  @Input() video: Video;

  @ViewChild('container') containerRef: ElementRef;

  htmlFrame: SafeHtml;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.htmlFrame = this.sanitizer.bypassSecurityTrustHtml(this.video.metaData.html);
  }

  ngAfterViewInit(): void {

    $(this.containerRef.nativeElement).find('iframe').css('width', '100%');

  }

}
