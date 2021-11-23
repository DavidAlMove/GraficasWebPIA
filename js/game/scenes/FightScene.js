import Scene from "../../engine/Scene.js";
import Character from "../gameObjects/Character.js";
import Resources from "../../engine/Resources.js";
import AstroGun from "../gameObjects/AstroGun.js";
import Sword from "../gameObjects/Sword.js";
import Shield from "../gameObjects/Shield.js";
import CharacterAi from "../gameObjects/CharacterAi.js";


// Todas las escenas extienden la clase base Scene
export default class FightScene extends Scene {
    player1;
    player2;
    player3;

    ia1;
    ia2;
    ia3;
    
    constructor(canvas) {
        const camera = new THREE.PerspectiveCamera (
            90,
            canvas.width / canvas.height,
            0.1,
            200
        );
        camera.position.set(0, -3, -1);
        
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
        
        var mapita = localStorage.getItem('map');
        const mapa = Resources.getModelResource(mapita).clone();
        mapa.position.x = 0;
        mapa.position.y = -20;
        mapa.position.z = -60;
        mapa.scale.set(0.045, 0.04, 0.025);
        mapa.userData.solid = true;
        this.addNative(mapa);

        // La clase Character extiende una clase base llamada GameObject
        // que envuelve un objeto nativo de Three.js y le agrega cierta lógica
        // Consulta los archivos js/game/gameObjects/Character.js y js/engine/GameObject.js

        if(localStorage.getItem('Player1') != null){
            var playerChar = JSON.parse(localStorage.getItem('Player1'));
            this.player1 = new Character(this, {
                position: new THREE.Vector3(0, -15, -20),
                skin: playerChar['skin'],
                userId: playerChar['idUser']
            });
            this.add(this.player1);
        }

        if(localStorage.getItem('Player2') != null){
            var playerChar = JSON.parse(localStorage.getItem('Player2'));
            this.player2 = new Character(this, {
                position: new THREE.Vector3(10, -15, -20),
                controlMap: {
                    right: "l",
                    left: "j",
                    up: "i",
                    down: "k",
                    punch: "u",
                    kick: "o",
                    jump: "m",
                    interact: "u"
                },
                skin: playerChar['skin'],
                userId: playerChar['idUser']
            });
            this.add(this.player2);
        }
        
        if(localStorage.getItem('Player3') != null){
            var playerChar = JSON.parse(localStorage.getItem('Player3'));
            this.player3 = new Character(this, {
                position: new THREE.Vector3(-20, -15, -20),
                controlMap: {
                    right: "6",
                    left: "4",
                    up: "8",
                    down: "5",
                    punch: "7",
                    kick: "9",
                    jump: "0",
                    interact: "7"
                },
                skin: playerChar['skin'],
                userId: playerChar['idUser']
            });
            this.add(this.player3);
        }

        if(localStorage.getItem('IA1') != null){
            var IAChar = JSON.parse(localStorage.getItem('IA1'));
            this.ia1 = new CharacterAi(this,{
                position: new THREE.Vector3(5, -15, -20),
                skin: IAChar['skin'],
                userId: IAChar['idUser']
            });
            this.add(this.ia1);
        }

        if(localStorage.getItem('IA2') != null){
            var IAChar = JSON.parse(localStorage.getItem('IA2'));
            this.ia2 = new CharacterAi(this,{
                position: new THREE.Vector3(-15, -15, -20),
                skin: IAChar['skin'],
                userId: IAChar['idUser']
            });
            this.add(this.ia2);
        }

        if(localStorage.getItem('IA3') != null){
            var IAChar = JSON.parse(localStorage.getItem('IA3'));
            this.ia3 = new CharacterAi(this,{
                position: new THREE.Vector3(25, -15, -20),
                skin: IAChar['skin'],
                userId: IAChar['idUser']
            });
            this.add(this.ia3);
        }
                
        this.add(new AstroGun(this, {
            position: new THREE.Vector3(0, 0, -20)
        }));

        this.add(new Sword(this, {
            position: new THREE.Vector3(-20, -15, -20)
        }));

        this.add(new Shield(this, {
            position: new THREE.Vector3(20, -10, -20)
        }));

    }
}