import Resources from "../../engine/Resources.js";
import Item from "./Item.js";

export default class PickableItem extends Item {
    pickedUp;
    pickUpCooldown = 0;
    pickUpSound;
    
    constructor(scene, pickedUp) {
        super(scene);
        this.pickedUp = pickedUp;

        this.pickUpSound = new THREE.Audio(this.scene.listener);
        this.pickUpSound.setBuffer(Resources.getAudioResource('PickUp'));
    }

    onDrop(position) {
        this.pickedUp = false;
        this.pickUpCooldown = 2;
    }

    onInteraction(triggerObject) {
        this.pickUpSound.play();
        this.pickedUp = true;
    }

    onUpdate(dt) {
        this.pickUpCooldown -= dt;
        this.pickUpCooldown = Math.max(this.pickUpCooldown, 0);
    }
}