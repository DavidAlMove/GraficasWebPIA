export default class Input {
    static keys = {}
    
    static keyIsDown(key) {
        return Input.keys[key.toLowerCase()] ?? false;
    }

    static onKeyDown(key) {
        Input.keys[key.toLowerCase()] = true;
    }

    static onKeyUp(key) {
        Input.keys[key.toLowerCase()] = false;
    }
}