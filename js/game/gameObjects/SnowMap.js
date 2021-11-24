import GameObject from "../../engine/GameObject.js";
import Resources from "../../engine/Resources.js";

export default class SnowMap extends GameObject {
    music;

    constructor(scene) {
        super(scene);

        const mapa = Resources.getModelResource('MapTwo').clone();

        mapa.position.x = 30;
        mapa.position.y = -25;
        mapa.position.z = -60;
        mapa.scale.multiplyScalar(0.25);

        this.handler = mapa;
    }

    onStart() {
        this.scene.getNativeScene().background = Resources.getCubeMapResource('EveningSkybox');
        
        this.music = new THREE.Audio(this.scene.listener);
        this.music.setBuffer(Resources.getAudioResource('SnowMusic'));
        this.music.setLoop(true);
        this.music.setVolume(0.5);
        this.music.play();
    }
}