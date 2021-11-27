import GameObject from "../../engine/GameObject.js";
import Resources from "../../engine/Resources.js";
import Character from "./Character.js";
import SimpleParticleSystem from "./SimpleParticleSystem.js";

export default class Bullet extends GameObject {

    static baseBullet;

    particleSystem;

    lifetime = 10;

    direction;
    speed;
    radius;
    sphere;
    attackPower;

    sparkSound;

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

        this.sparkSound = new THREE.Audio(this.scene.listener);
        this.sparkSound.setBuffer(Resources.getAudioResource('Spark'));

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

        this.lifetime -= dt;
        if (this.lifetime <= 0) {
            this.lifetime = 0;
            this.scene.remove(this);
            return;
        }

        this.updateCollisions(dt);
    }

    updateCollisions(dt) {
        for (const player of Character.totalPlayers) {
            this.sphere.set(this.handler.position, this.radius);
            if (!player.isDeath && player.hurtBox.box.intersectsSphere(this.sphere)) {
                // colission with player
                this.sparkSound.play();
                player.onDamage(dt, this.direction, this.attackPower);
                this.scene.remove(this);
            }
        }
    }

}