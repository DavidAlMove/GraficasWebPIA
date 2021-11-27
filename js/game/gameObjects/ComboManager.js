export default class ComboManager {

    controlMap = {};

    comboList = {}

    constructor(character) {
        this.controlMap = character.controlMap;

        // Create combos
        const punchCombo = `${character.controlMap.punch},${character.controlMap.kick},${character.controlMap.punch}`;
        this.comboList[punchCombo] = 'specialPunch';

        const kickCombo = `${character.controlMap.punch},${character.controlMap.punch},${character.controlMap.kick}`;
        this.comboList[kickCombo] = 'specialKick';
    }

    keyHistory = [];

    keyLifetime = 3;

    currentCombo = '';

    onKeyDown(key, repeat) {
        const upperKey = key.toUpperCase();

        if (!repeat && (upperKey == this.controlMap.punch || upperKey == this.controlMap.kick)) {
            this.keyHistory.push(upperKey);
            
            if (this.keyHistory.length > 3) {
                this.keyHistory.shift();
            }
            
            // console.log(this.keyHistory);
        }
    }

    onKeyUp(key) {
        const upperKey = key.toUpperCase();

        if (upperKey === this.controlMap.punch || upperKey === this.controlMap.kick) {
            this.currentCombo = '';
        }
    }

    getCurrentCombo() {
        if (this.currentCombo === '') {
            const comboString = this.keyHistory.toString();
            this.currentCombo = this.comboList[comboString] ?? '';
            if (this.currentCombo !== '') {
                this.keyHistory.length = 0;
            }
        }

        return this.currentCombo;
    }

    onUpdate(dt) {
        this.keyLifetime -= dt;

        if (this.keyLifetime <= 0) {
            this.keyLifetime = 3;

            this.keyHistory.length = 0;
        }
        // console.log(this.getCurrentCombo());
    }
}