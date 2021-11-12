import Item from "./Item.js";
import Resources from "../../engine/Resources.js";
import Character from "./Character.js";
import PickableItem from "./PickableItem.js";

export default class AstroGun extends PickableItem {

    constructor(scene, props = {}) {
        super(scene, props.pickedUp ?? false);

        this.initModel(props);
        this.updateFloorY();
    }

    initModel(props) {
        const original = Resources.getModelResource('AstroGun');
        const object = original.clone();
        
        const pivot = new THREE.Group();
        pivot.rotation.y = THREE.Math.degToRad(90);
        pivot.scale.set(0.03, 0.03, 0.03);
        pivot.add(object);
        object.position.y = 20;

        if (props.position) {
            pivot.position.copy(props.position);
        }

        this.handler = pivot;
    }

    getActionCharacterState() {
        return Character.State.Shoot;
    }

    getType() {
        return Item.Type.Attack;
    }
    
    onUpdate(dt) {
        if (!this.pickedUp) {
            this.updateGravity(dt);
            if (this.pickUpCooldown <= 0) {
                this.checkForInteraction();
            }
        }
        super.onUpdate(dt);
    }

    onInteraction(triggerObject) {
        this.handler.position.set(0, 0, 0);
        this.handler.children[0].position.set(0, 0, 0);
        this.handler.rotation.set(0, 0, 0);
        triggerObject.setCurrentItem(this);
        super.onInteraction();
    }

    onDrop(position) {
        this.scene.addNative(this.handler);
        this.handler.rotation.y = THREE.Math.degToRad(90);
        this.handler.position.copy(position);
        this.handler.children[0].position.y = 20;
        super.onDrop(position);
    }
}