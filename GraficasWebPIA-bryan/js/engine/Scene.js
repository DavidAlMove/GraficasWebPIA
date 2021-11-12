export default class Scene {
    scene;
    camera;
    renderer;

    gameObjects = [];

    constructor(camera, renderer) {
        this.scene = new THREE.Scene();

        this.camera = camera ?? new THREE.PerspectiveCamera(
            90,
            window.innerWidth / window.innerHeight,
            0.1,
            200
        );

        this.renderer = renderer ?? new THREE.WebGLRenderer();
    }

    // Obtiene el objeto scene nativo de Three.js
    getNativeScene() {
        return this.scene;
    }

    // Obtener y modificar la cámara principal de la escena (get/set)
    getCamera() {
        return this.camera;
    }

    setCamera(camera) {
        this.camera = camera;
    }

    getRenderer() {
        return this.renderer;
    }

    setRenderer(renderer) {
        this.renderer = renderer;
    }

    // Agregar un objeto de una clase que extienda la clase GameObject
    add(gameObject) {
        this.gameObjects.push(gameObject);
        this.scene.add(gameObject.handler);
    }

    // Agregar un objeto nativo de Three.js
    addNative(handler) {
        this.scene.add(handler);
    }

    // Se ejecuta una vez al iniciar la aplicación
    onStart() {
        for (const gameObject of this.gameObjects) {
            gameObject.onStart();
        }
    }

    // Se ejecuta en el game loop. Únicamente actualiza la lógica de la escena
    onUpdate(dt) {
        for (const gameObject of this.gameObjects) {
            gameObject.onUpdate(dt);
        }
    }

    // Se ejecuta en el game loop después de actualizar la lógica de la escena
    render() {
        this.renderer.render(this.scene, this.camera);
    }

    // Estos son manejadores de eventos de teclas.
    onKeyDown(key) {
        for (const gameObject of this.gameObjects) {
            gameObject.onKeyDown(key);
        }
    }

    onKeyPressed(key) {
        for (const gameObject of this.gameObjects) {
            gameObject.onKeyPressed(key);
        }
    }

    onKeyUp(key) {
        for (const gameObject of this.gameObjects) {
            gameObject.onKeyUp(key);
        }
    }
}