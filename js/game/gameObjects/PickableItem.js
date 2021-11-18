import Item from "./Item.js";

export default class PickableItem extends Item {
    pickedUp;
    pickUpCooldown = 0;
    
    constructor(scene, pickedUp) {
        super(scene);
        this.pickedUp = pickedUp;
    }

    onDrop(position) {
        this.pickedUp = false;
        this.pickUpCooldown = 2;
    }

    onInteraction(triggerObject) {
        this.pickedUp = true;
    }

    onUpdate(dt) {
        this.pickUpCooldown -= dt;
        this.pickUpCooldown = Math.max(this.pickUpCooldown, 0);
    }
}