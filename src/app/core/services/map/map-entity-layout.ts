import {MapComponent} from '../../../shared/components/map/map.component';
import {ComponentFactoryResolver, ComponentRef, Type} from '@angular/core';
import {GeoLocation} from '../../data/model/geo-location.model';
import Overlay from 'ol/Overlay';
import {fromLonLat, toLonLat, transformExtent } from 'ol/proj.js';
import {MapBalloonGroupComponent} from '../../../shared/components/map-balloon-group/map-balloon-group.component';
import {environment} from '../../../../environments/environment';

export class MapEntityLayout {

    balloonGroups: Array<ComponentRef<MapBalloonGroupComponent>> = [];

    constructor(private map: MapComponent, private componentResolver: ComponentFactoryResolver)
    {

    }

    addEntity<C>(component: Type<C>, location: GeoLocation): ComponentRef<C>
    {
        // find a nearest balloon group on the map
        let group: ComponentRef<MapBalloonGroupComponent> = this.getNearestBalloonGroup(location);

        // if there isn't anyone
        if (!group)
        {
            // create a new balloon group
            group = this.createGroupOverlay(location);
            // add it on the map
        }


        // add a new component to the balloon group
        const result = group.instance.createChildBalloon(component);
            // the new target component should be hosted by the balloon group component

        // return the result
        return result;


        /*const factory = this.componentResolver.resolveComponentFactory(component);
        const result = this.map.mapContainerRef.createComponent(factory);

        const position = fromLonLat([location.longitude, location.latitude]);

        const overlay: Overlay = this.createOverlay(result);
        overlay.setPosition(position);

        this.map.map.addOverlay(overlay);

        return result;*/
    }

    removeEntity<C>(component: ComponentRef<C>)
    {
        let result = false;

        for (let i = 0; i < this.balloonGroups.length; i++)
        {
            if (this.balloonGroups[i].instance.removeChildBalloon(component))
            {
                if (this.balloonGroups[i].instance.getChildNumber() === 0)
                {
                    const componentIndex = this.map.mapContainerRef.indexOf(this.balloonGroups[i].hostView);
                    if (componentIndex !== -1)
                    {
                        this.map.mapContainerRef.remove(componentIndex);
                    }

                    this.balloonGroups.splice(i, 1);
                }

                result = true;

                break;
            }
        }


        return result;

        /*
        let result = false;

        const componentIndex = this.map.mapContainerRef.indexOf(component.hostView);
        if (componentIndex !== -1)
        {
            this.map.mapContainerRef.remove(componentIndex);
            result = true;
        }

        return result;*/
    }

    removeAllEntities()
    {
        this.balloonGroups = [];
        this.map.mapContainerRef.clear();
    }

    private getNearestBalloonGroup(location: GeoLocation): ComponentRef<MapBalloonGroupComponent> | null
    {
        let result = null;

        for (let i = 0; i < this.balloonGroups.length; i++)
        {
            if (this.arePointsNear(location, this.balloonGroups[i].instance.location))
            {
                result = this.balloonGroups[i];

                break;
            }
        }

        return result;
    }

    private arePointsNear(location1: GeoLocation, location2: GeoLocation) : boolean
    {
        let result = false;

        if (
            (Math.abs(location1.latitude - location2.latitude) <= environment.nearGeoCoordinateMaxDelta) &&
            (Math.abs(location1.longitude - location2.longitude) <= environment.nearGeoCoordinateMaxDelta)
        )
        {
            result = true;
        }

        return result;
    }


    private createGroupOverlay(location: GeoLocation): Overlay
    {
        const factory = this.componentResolver.resolveComponentFactory(MapBalloonGroupComponent);
        const result = this.map.mapContainerRef.createComponent(factory);
        result.instance.location = location;

        const position = fromLonLat([location.longitude, location.latitude]);

        const overlay: Overlay = this.createOverlay(result);
        overlay.setPosition(position);

        this.map.map.addOverlay(overlay);

        this.balloonGroups.push(result);

        return result;
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