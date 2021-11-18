import Item from "./Item.js";
import Resources from "../../engine/Resources.js";
import Character from "./Character.js";
import PickableItem from "./PickableItem.js";

export default class Sword extends PickableItem {

    holder = null;
    hitbox = {};

    attackBonus;
    attackCooldown = 0;

    constructor(scene, props = {}) {
        super(scene, props.pickedUp ?? false);

        this.attackBonus = props.attackBonus ?? 2;

        this.initModel(props);
    }

    initModel(props) {
        const original = Resources.getModelResource('Sword');
        const object = original.clone();
        
        const pivot = new THREE.Group();
        pivot.scale.set(0.03, 0.03, 0.03);
        pivot.add(object);
        object.position.y = 35;

        if (props.position) {
            pivot.position.copy(props.position);
        }

        this.attachHitbox(object);
        this.handler = pivot;
    }

    attachHitbox(object) {
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: 0.5
        });
        const collisionBoxHelper = new THREE.Mesh( geometry, material );
        collisionBoxHelper.geometry.computeBoundingBox();
        collisionBoxHelper.visible = false;

        const hitboxMesh = collisionBoxHelper.clone();
        hitboxMesh.scale.set(15, 135, 20);
        hitboxMesh.position.y = 130;

        this.hitbox = {
            mesh: hitboxMesh,
            box: new THREE.OBB(),
            active: false
        };

        object.add(hitboxMesh);
    }
    
    getActionCharacterState() {
        return Character.State.Attack;
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
        else {
            this.updateBoundingBox();
            this.updateCollisions(dt);
        }

        this.attackCooldown -= dt;
        this.attackCooldown = Math.max(this.attackCooldown, 0);
        
        super.onUpdate(dt);
    }

    onInteraction(triggerObject) {
        this.handler.position.set(0, 0, 0);
        this.handler.children[0].position.set(0, 0, 0);
        this.handler.rotation.y = THREE.Math.degToRad(90);
        triggerObject.setCurrentItem(this);
        this.holder = triggerObject;
        super.onInteraction(triggerObject);
    }

    onUse(triggerObject, beginUse = true) {
        this.hitbox.active = beginUse;
        return this.getActionCharacterState();
    }

    onDrop(position) {
        this.scene.addNative(this.handler);
        this.handler.position.copy(position);
        this.handler.children[0].position.y = 35;
        this.handler.rotation.y = 0;
        this.holder = null;
        super.onDrop(position);
    }

    updateBoundingBox() {
        this.hitbox.box.fromBox3(this.hitbox.mesh.geometry.boundingBox);
        this.hitbox.box.applyMatrix4(this.hitbox.mesh.matrixWorld);
    }

    updateCollisions(dt) {
        // Update collisions with players
        for (const player of Character.totalPlayers) {
            if (player.playerIndex != this.holder.playerIndex && !player.isDeath) {
                if (this.hitbox.active
                        && this.attackCooldown <= 0
                        && this.hitbox.box.intersectsOBB(player.hurtBox.box)
                    ) {
                    this.attackCooldown = 0.5;
                    player.onDamage(dt, this.holder.direction, this.holder.attackPower * this.attackBonus);
                    // break; // Maybe needed
                }
            }
        }
    }
}