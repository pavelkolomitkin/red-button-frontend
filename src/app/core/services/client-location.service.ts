import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';
import {GeoLocation} from '../data/model/geo-location.model';

export class ClientLocationService
{
    getCurrentLocation(): Observable<GeoLocation>
    {
        return new Observable((subscriber) => {

            if (navigator.geolocation)
            {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        subscriber.next({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                    },
                    () => {
                        subscriber.next({...environment.defaultGeoPosition});
                    }
                );
            }
            else
            {
                subscriber.next({...environment.defaultGeoPosition});
            }
        });
    }
}
