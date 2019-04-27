import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Video} from '../../data/model/video.model';
import {VideoService} from '../../services/video.service';
import {catchError, map} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.css']
})
export class VideoFormComponent implements OnInit, OnDestroy {

  static LOADING_STATE = 'LOADING_STATE';
  static READY_STATE = 'READY_STATE';

  @Output('onConfirmVideo') confirmVideo: EventEmitter<Video> = new EventEmitter();

  videoUrl: string;

  errors: Object = {};

  videoServiceSubscription: Subscription;

  currentState: string = VideoFormComponent.READY_STATE;

  constructor(private service:VideoService) { }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    if (this.videoServiceSubscription)
    {
      this.videoServiceSubscription.unsubscribe();
      this.videoServiceSubscription = null;
    }
  }

  onSubmitHandler(form: NgForm)
  {
    if (this.videoServiceSubscription)
    {
      this.videoServiceSubscription.unsubscribe();
      this.videoServiceSubscription = null;
    }

    this.currentState = VideoFormComponent.LOADING_STATE;

    this.videoServiceSubscription = this.service.create(this.videoUrl).subscribe(
        (video: Video) => {
          this.confirmVideo.emit(video);

          this.currentState = VideoFormComponent.READY_STATE;
        },
        (error) => {
          this.errors = error.error.errors;
          this.currentState = VideoFormComponent.READY_STATE;
        }
    )
  }
}
