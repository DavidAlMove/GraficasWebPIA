import Scene from "../../engine/Scene.js";
import Character from "../gameObjects/Character.js";
import Resources from "../../engine/Resources.js";
import CharacterAi from "../gameObjects/CharacterAi.js";
import MapFactory from "../MapFactory.js";
import GameManager from "../gameObjects/GameManager.js";
import ItemSpawner from "../ItemSpawner.js";

// Todas las escenas extienden la clase base Scene
export default class FightScene extends Scene {
    player1;
    player2;
    player3;

    ia1;
    ia2;
    ia3;
    
    pause = false;
    itemSpawner;

    constructor(canvas) {
        const camera = new THREE.PerspectiveCamera (
            45,
            canvas.width / canvas.height,
            0.1,
            1000
        );
        camera.position.set(0, -5, 30);
        
        const renderer = new THREE.WebGLRenderer();
		renderer.setClearColor( new THREE.Color(1 , 1, 1));
		renderer.setSize(canvas.width, canvas.height);

        document.getElementById(canvas.id).append(renderer.domElement);

        // Esto es importante para especificar la cámara y el renderer de la escena
        super(camera, renderer);

        const activeItems = localStorage.getItem('items') ?? 'false';
        const activeItemsFlag = (activeItems.toLowerCase() === 'true');
        
        this.itemSpawner = new ItemSpawner(this, {
            active: activeItemsFlag
        });

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
        
        var mapName = localStorage.getItem('map');
        const mapa = MapFactory.create(this, mapName);
        this.add(mapa);

        const geometry = new THREE.PlaneGeometry( 200, 50 );
        const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        const plane = new THREE.Mesh( geometry, material );
        plane.visible = false;
        plane.rotation.x = THREE.Math.degToRad(-90);
        plane.position.y = -19.6;
        plane.userData.solid = true;
        this.addNative(plane);

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
                    right: "L",
                    left: "J",
                    up: "I",
                    down: "K",
                    punch: "U",
                    kick: "O",
                    jump: "M",
                    interact: "U"
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

        // Preparar las IA
        const difficulty = localStorage.getItem('difficulty') ?? 'normal';
        const hpLevels = {
            'easy': 40,
            'normal': 50,
            'hard': 60
        };
        const aiHp = hpLevels[difficulty];

        if(localStorage.getItem('IA1') != null){
            var IAChar = JSON.parse(localStorage.getItem('IA1'));
            this.ia1 = new CharacterAi(this,{
                position: new THREE.Vector3(5, -15, -20),
                skin: IAChar['skin'],
                userId: IAChar['idIA'],
                hp: aiHp
            });
            this.add(this.ia1);
        }

        if(localStorage.getItem('IA2') != null){
            var IAChar = JSON.parse(localStorage.getItem('IA2'));
            this.ia2 = new CharacterAi(this,{
                position: new THREE.Vector3(-15, -15, -20),
                skin: IAChar['skin'],
                userId: IAChar['idIA'],
                hp: aiHp
            });
            this.add(this.ia2);
        }

        if(localStorage.getItem('IA3') != null){
            var IAChar = JSON.parse(localStorage.getItem('IA3'));
            this.ia3 = new CharacterAi(this,{
                position: new THREE.Vector3(25, -15, -20),
                skin: IAChar['skin'],
                userId: IAChar['idIA'],
                hp: aiHp
            });
            this.add(this.ia3);
        }
    }

    onKeyPressed(key, repeat) {
        super.onKeyPressed(key, repeat);

        if (key.toLowerCase() === 'enter') {
            this.pauseGame();
        }
    }

    onUpdate(dt) {
        if (!this.pause) {
            this.itemSpawner.onUpdate(dt);
            super.onUpdate(dt);
        }
        GameManager.onUpdate(dt);
    }

    pauseGame() {
        this.pause = !this.pause;
        document.getElementById('pauseMenu').style.visibility = this.pause ? 'visible' : 'hidden';
    }
}