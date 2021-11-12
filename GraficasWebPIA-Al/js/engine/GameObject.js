export default class GameObject {
    scene;
    handler;

    constructor(scene) {
        this.scene = scene;
    }

    getNative() {
        return this.handler;
    }

    // Se ejecuta una vez cuando la aplicación empieza a correr
    onStart() {}

    // Se ejecuta constantement dentro del game loop
    // Siempre recibe el delta time (dt) por si se necesita
    onUpdate(dt) {}

    // Planeo que funcione antes de que un objeto se destruya, pero aún no tiene función
    onDestroy() {}

    // Estos son manejadores de eventos que se pueden sobreescribir para tener lógica
    // cuando estos eventos se disparen
    onKeyDown(key) {}

    onKeyPressed(key) {}

    onKeyUp(key) {}
}