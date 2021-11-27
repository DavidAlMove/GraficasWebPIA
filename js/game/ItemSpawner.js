import AstroGun from "./gameObjects/AstroGun.js";
import Shield from "./gameObjects/Shield.js";
import Sword from "./gameObjects/Sword.js";

class ItemFactory {
    static create(name, scene, props) {
        switch (name) {
            case 'AstroGun':
                return new AstroGun(scene, props);
            case 'Shield':
                return new Shield(scene, props);
            case 'Sword':
                return new Sword(scene, props);
        }
    }
}

export default class ItemSpawner {
    spawnTimer;
    spawnTime;
    scene;

    coordY;
    coordZ;
    minCoordX;
    maxCoordX;

    active;

    itemBag = [
        'AstroGun',
        'AstroGun',
        'AstroGun',
        'Shield',
        'Shield',
        'Shield',
        'Sword',
        'Sword'
    ];

    constructor(scene, props = {}) {
        this.scene = scene;
        this.spawnTime = props.spawnTime ?? 10;
        this.spawnTimer = this.spawnTime;
        this.minCoordX = props.minCoordX ?? -40;
        this.maxCoordX = props.maxCoordX ?? 40;
        this.coordY = props.coordY ?? -10;
        this.coordZ = props.coordZ ?? -20;
        this.active = props.active ?? true;
    }
    
    spawnItem() {
        if (this.itemBag.length > 0) {
            // Get Random X coord
            const randomCoordX = THREE.Math.randFloat(this.minCoordX, this.maxCoordX);
            const position = new THREE.Vector3(randomCoordX, this.coordY, this.coordZ);

            const randomIndex = THREE.Math.randInt(0, this.itemBag.length - 1);

            const props = {
                position: position
            };

            const itemName = this.itemBag[randomIndex];
            this.scene.add(ItemFactory.create(itemName, this.scene, props));
            this.itemBag.splice(randomIndex, 1);
        }
    }

    onUpdate(dt) {
        if (this.active) {
            this.spawnTimer -= dt;
            if (this.spawnTimer <= 0) {
                this.spawnItem();
                this.spawnTimer = this.spawnTime;
            }
        }
    }
}