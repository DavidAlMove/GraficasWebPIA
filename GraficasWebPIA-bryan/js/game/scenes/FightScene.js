import Scene from "../../engine/Scene.js";
import Character from "../gameObjects/Character.js";
import Resources from "../../engine/Resources.js";

// Todas las escenas extienden la clase base Scene
export default class FightScene extends Scene {
    player1;
    player2;
    
    constructor(canvas) {
        const camera = new THREE.PerspectiveCamera (
            90,
            canvas.width / canvas.height,
            0.1,
            200
        );
        
        const renderer = new THREE.WebGLRenderer();
		renderer.setClearColor( new THREE.Color(1 , 1, 1));
		renderer.setSize(canvas.width, canvas.height);

        document.getElementById(canvas.id).append(renderer.domElement);

        // Esto es importante para especificar la cámara y el renderer de la escena
        super(camera, renderer);

        this.prepare();
    }

    prepare() {
        const ambient = new THREE.AmbientLight(
            new THREE.Color(1,1,1),
            1.0
        );

        const directional = new THREE.DirectionalLight(
            new THREE.Color(1,1,1),
            0.2
        );

        directional.position.set(0,0,1);

        // Con el método addNative se pueden agregar objetos nativos de Three.js
        this.addNative(ambient);
        this.addNative(directional);

        // let mapa1 = new THREE.FBXLoader();
        // mapa1.load(Resources.getModelPath('MapTwo'), (object) => {
        //     object.position.x = 0;
        //     object.position.y = -20;
        //     object.position.z = -60;
        //     object.scale.set(0.045, 0.04, 0.025);
        //     this.addNative(object);
        // });
        const mapa = Resources.getModelResource('MapTwo').clone();
        mapa.position.x = 0;
        mapa.position.y = -20;
        mapa.position.z = -60;
        mapa.scale.set(0.045, 0.04, 0.025);
        this.addNative(mapa);

        // La clase Character extiende una clase base llamada GameObject
        // que envuelve un objeto nativo de Three.js y le agrega cierta lógica
        // Consulta los archivos js/game/gameObjects/Character.js y js/engine/GameObject.js
        this.player1 = new Character(this, {
            position: new THREE.Vector3(0, -15, -20),
            skin: 'ZombieA'
        });

        this.player2 = new Character(this, {
            position: new THREE.Vector3(20, -15, -20),
            controlMap: {
                right: "6",
                left: "4",
                up: "",
                down: "",
                punch: "7",
                kick: "9",
                jump: "0"
            },
            skin: 'AlienA'
        });
    }
}