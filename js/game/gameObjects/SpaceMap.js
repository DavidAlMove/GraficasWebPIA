import GameObject from "../../engine/GameObject.js";
import Resources from "../../engine/Resources.js";

export default class SpaceMap extends GameObject {

    constructor(scene) {
        super(scene);

        const mapa = Resources.getModelResource('MapFour').clone();

        mapa.position.x = 20;
        mapa.position.y = -25;
        mapa.position.z = -150;
        mapa.scale.multiplyScalar(0.25);

        this.handler = mapa;
    }

    onStart() {
        this.scene.getNativeScene().background = Resources.getCubeMapResource('SunsetSkybox');

        this.music = new THREE.Audio(this.scene.listener);
        this.music.setBuffer(Resources.getAudioResource('SpaceMusic'));
        this.music.setLoop(true);
        this.music.setVolume(0.5);
        this.music.play();
    }
}