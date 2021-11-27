import GameObject from "../../engine/GameObject.js";
import Resources from "../../engine/Resources.js";

export default class MinecraftMap extends GameObject {

    constructor(scene) {
        super(scene);

        const mapa = Resources.getModelResource('MapThree').clone();

        mapa.position.x = 0;
        mapa.position.y = -20;
        mapa.position.z = -100;
        mapa.scale.multiplyScalar(0.04);

        this.handler = mapa;
    }

    onStart() {
        this.scene.getNativeScene().background = Resources.getCubeMapResource('DaySkybox');

        this.music = new THREE.Audio(this.scene.listener);
        this.music.setBuffer(Resources.getAudioResource('MinecraftMusic'));
        this.music.setLoop(true);
        this.music.setVolume(0.5);
        this.music.play();
    }
}