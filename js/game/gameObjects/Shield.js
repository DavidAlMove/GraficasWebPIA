import Item from "./Item.js";
import Resources from "../../engine/Resources.js";
import Character from "./Character.js";
import PickableItem from "./PickableItem.js";

export default class Shield extends PickableItem {
    
    constructor(scene, props = {}) {
        super(scene, props.pickedUp ?? false);

        this.initModel(props);
    }

    initModel(props) {
        const original = Resources.getModelResource('Shield');
        const object = original.clone();
        
        const pivot = new THREE.Group();
        pivot.scale.set(0.03, 0.03, 0.03);
        pivot.add(object);
        object.position.y = 80;

        if (props.position) {
            pivot.position.copy(props.position);
        }

        this.handler = pivot;
    }

    getActionCharacterState() {
        return Character.State.Shield;
    }

    getType() {
        return Item.Type.Defense;
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
        this.pickedUp = true;
        this.handler.position.set(0, 0, 0);
        this.handler.children[0].position.set(0, 0, 0);
        triggerObject.setCurrentItem(this, 'lFArm');
        super.onInteraction(triggerObject);
    }

    onDrop(position) {
        this.scene.addNative(this.handler);
        this.handler.position.copy(position);
        this.handler.children[0].position.y = 80;
        super.onDrop(position);
    }
}