import GameObject from "../../engine/GameObject.js";
import Resources from "../../engine/Resources.js";

export default class SimpleParticleSystem extends GameObject {

    width;
    height;
    depth;
    particles;
    particleCount;
    texture;
    visible = true;

    constructor(scene, props = {}) {
        super(scene);
        this.width = props['width'] ?? 5;
        this.height = props['height'] ?? 5;
        this.depth = props['depth'] ?? 5;
        this.particleCount = props['particleCount'] ?? 30;
        this.texture = props['texture'] ?? 'Particle';

        this.initParticles();

        if (props['position']) {
            this.handler.position.copy(props['position']);
        }
    }

    initParticles() {
        this.particles = new THREE.BufferGeometry();
        const positionArray = new Float32Array(this.particleCount * 3);

        for(let i = 0; i < this.particleCount * 3; i += 3) {
            positionArray[i] = Math.random() * this.width - (this.width / 2);
            positionArray[i + 1] = Math.random() * this.height - (this.height / 2);
            positionArray[i + 2] = Math.random() * this.depth - (this.depth / 2);
        }

        this.particles.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));

        const particleMaterial = new THREE.PointsMaterial({
            color: 0xFFDE75,
            size: 0.5,
            map: Resources.getTextureResource(this.texture),
            blending: THREE.AdditiveBlending,
            transparent: true
        });

        this.handler = new THREE.Points(this.particles, particleMaterial);
    }

    setVisible(visible) {
        this.visible = visible;
    }

    onUpdate(dt) {
        this.handler.visible = this.visible;
        const positions = this.particles.getAttribute('position');

        for(let i = 0; i < this.particleCount; i++) {
            const y = positions.getY(i);
            if (y >= this.height) {
                positions.setY(i, Math.random() * this.height - (this.height / 2));
            }
            else {
                positions.setY(i, y + dt);
            }
        }

        positions.needsUpdate = true;

        this.handler.rotation.y += THREE.Math.degToRad(10 * dt);
    }

}