import GameObject from "../../engine/GameObject.js";
import Character from "./Character.js";
import SimpleParticleSystem from "./SimpleParticleSystem.js";

export default class Bullet extends GameObject {

    static baseBullet;

    particleSystem;

    direction;
    speed;
    radius;
    sphere;
    attackPower;

    constructor(scene, position, direction, props = {}) {
        super(scene);
        this.speed = props['speed'] ?? 30;
        this.radius = props['radius'] ?? 0.5;
        this.attackPower = props['attackPower'] ?? 20;
        this.direction = direction;
        this.sphere = new THREE.Sphere();

        this.particleSystem = new SimpleParticleSystem(scene, {
            width: 2,
            height: 2,
            depth: 2,
            particleCount: 10
        });

        if (!Bullet.baseBullet) {
            const geometry = new THREE.SphereGeometry( this.radius, 8, 8 );
            const material = new THREE.MeshBasicMaterial( { color: 0xFFDA00 } );
            Bullet.baseBullet = new THREE.Mesh( geometry, material );
        }

        this.handler = Bullet.baseBullet.clone();
        this.handler.position.copy(position);
        this.handler.add(this.particleSystem.getNative());
    }

    onUpdate(dt) {
        this.particleSystem.onUpdate(dt);
        this.handler.position.x += this.speed * this.direction * dt;
        this.updateCollisions(dt);
    }

    updateCollisions(dt) {
        for (const player of Character.totalPlayers) {
            this.sphere.set(this.handler.position, this.radius);
            if (!player.isDeath && player.hurtBox.box.intersectsSphere(this.sphere)) {
                // colission with player
                player.onDamage(dt, this.direction, this.attackPower);
                this.scene.remove(this);
            }
        }
    }

}