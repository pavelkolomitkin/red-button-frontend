import {MapComponent} from '../../../shared/components/map/map.component';
import {ComponentFactoryResolver, ComponentRef, Type} from '@angular/core';
import {GeoLocation} from '../../data/model/geo-location.model';
import Overlay from 'ol/Overlay';
import {fromLonLat, toLonLat, transformExtent } from 'ol/proj.js';

export class MapEntityLayout {

    constructor(private map: MapComponent, private componentResolver: ComponentFactoryResolver)
    {

    }

    addEntity<C>(component: Type<C>, location: GeoLocation): ComponentRef<C>
    {
        const factory = this.componentResolver.resolveComponentFactory(component);
        const result = this.map.mapContainerRef.createComponent(factory);

        const position = fromLonLat([location.longitude, location.latitude]);

        const overlay: Overlay = this.createOverlay(result);
        overlay.setPosition(position);

        this.map.map.addOverlay(overlay);

        return result;
    }

    removeEntity<C>(component: ComponentRef<C>)
    {
        let result = false;

        const componentIndex = this.map.mapContainerRef.indexOf(component.hostView);
        if (componentIndex !== -1)
        {
            this.map.mapContainerRef.remove(componentIndex);
            result = true;
        }

        return result;
    }

    removeAllEntities()
    {
        this.map.mapContainerRef.clear();
    }


    private createOverlay(component: ComponentRef<any>): Overlay
    {
        const result = new Overlay({
            element: component.location.nativeElement,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });

        return result;
    }
}