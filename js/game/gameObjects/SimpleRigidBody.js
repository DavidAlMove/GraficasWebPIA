import GameObject from "../../engine/GameObject.js";

export default class SimpleRigidBody extends GameObject {
    
    static gravity = -9.8;
    velocityY = 0;
    gravityFactor;
    onGround = false;
    floorY = 0;
    raycaster = new THREE.Raycaster();

    constructor(scene, props = {}) {
        super(scene);
        this.gravityFactor = props.gravityFactor ?? 1;
        this.velocityY = props.velocityY ?? 0;
    }

    updateGravity(dt) {
        this.updateFloorY();
        
        this.velocityY += SimpleRigidBody.gravity * this.gravityFactor * dt;
        this.handler.position.y += this.velocityY * dt;

        if (this.handler.position.y <= this.floorY) {
            this.handler.position.y = this.floorY;
            this.onGround = true;
            this.velocityY = 0;
        }
        else {
            this.onGround = false;
        }
    }

    updateFloorY() {
        const totalGravity = SimpleRigidBody.gravity * this.gravityFactor;
        const gravityDirection = totalGravity / Math.abs(totalGravity);

        this.raycaster.set(
            this.handler.position,
            new THREE.Vector3(0, gravityDirection, 0)
        );

        const intersections = this.raycaster.intersectObjects(this.scene.nativeSolidObjects, false);
        if (intersections.length > 0) {
            this.floorY = intersections[0].point.y;
        }
        else {
            this.floorY = Infinity * gravityDirection;
        }
    }
}