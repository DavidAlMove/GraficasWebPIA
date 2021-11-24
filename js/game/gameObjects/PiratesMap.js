import GameObject from "../../engine/GameObject.js";
import Resources from "../../engine/Resources.js";

export default class PiratesMap extends GameObject {

    constructor(scene) {
        super(scene);

        const mapa = Resources.getModelResource('MapOne').clone();

        mapa.position.x = 0;
        mapa.position.y = -22;
        mapa.position.z = -65;
        mapa.scale.multiplyScalar(0.08);

        this.handler = mapa;
    }

}