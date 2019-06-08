import {Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {GeoLocation} from '../../../core/data/model/geo-location.model';

@Component({
  selector: 'app-map-balloon-group',
  templateUrl: './map-balloon-group.component.html',
  styleUrls: ['./map-balloon-group.component.css']
})
export class MapBalloonGroupComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  @Input()
  location: GeoLocation;

  constructor(public componentResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  hasChildBalloon(component: ComponentRef<any>): boolean
  {
    return (this.container.indexOf(component.hostView) !== -1);
  }

  getChildNumber()
  {
    return this.container.length;
  }

  createChildBalloon(component: any): ComponentRef<any>
  {
    const factory = this.componentResolver.resolveComponentFactory(component);
    const result = this.container.createComponent(factory);

    return result;
  }

  removeChildBalloon(component: ComponentRef<any>): boolean
  {
    let result = false;

    const componentIndex = this.container.indexOf(component.hostView);
    if (componentIndex !== -1)
    {
      this.container.remove(componentIndex);

      result = true;
    }

    return result;
  }

}
