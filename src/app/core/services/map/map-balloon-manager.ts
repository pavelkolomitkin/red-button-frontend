import {MapComponent} from '../../../shared/components/map/map.component';
import {ComponentRef, Type} from '@angular/core';

export class MapBalloonManager
{
    items: Array<any> = [];

    balloonsHash: any = {};

    constructor(
        private map: MapComponent,
        private balloonType: any,
        private itemId: Function,
        private balloonLocation: Function,
        private onAddBalloon: Function = null,
        private onRemoveBalloon: Function = null
    )
    {

    }

    itemsEquals(item1, item2)
    {
        return (this.itemId(item1) === this.itemId(item2));
    }

    setItems(newItems: Array<any>)
    {
        // find items that should be removed
        const deletingItems: Array<any> = this.items.filter((oldItem) => {

            return !newItems.find((newItem) => {
                return this.itemsEquals(oldItem, newItem);
            });

        });
        // remove target items
        deletingItems.forEach((item) => {

            const itemId = this.itemId(item);

            const balloonComponent: ComponentRef<any> = this.balloonsHash[itemId];
            if (balloonComponent)
            {
                this.map.removeBalloon(balloonComponent);
                delete this.balloonsHash[itemId];

                if (this.onRemoveBalloon)
                {
                    this.onRemoveBalloon(item, balloonComponent);
                }
            }

        });

        // find items that should be added
        const addingItems: Array<any> = newItems.filter((newItem) => {

            return !this.items.find((oldItem) => {
                return this.itemsEquals(oldItem, newItem);
            });
        });

        // add target items
        addingItems.forEach((item) => {

            const balloon = this.map.addBalloon(this.balloonType, this.balloonLocation(item));

            const itemId = this.itemId(item);
            this.balloonsHash[itemId] = balloon;

            if (this.onAddBalloon)
            {
                this.onAddBalloon(item, balloon);
            }

        });


        this.items = newItems;
    }

    release()
    {
        this.map.removeAllBalloons();
        this.balloonsHash = null;
        this.items = null;
    }
}