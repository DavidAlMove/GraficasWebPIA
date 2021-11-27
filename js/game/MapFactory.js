import SpaceMap from './gameObjects/SpaceMap.js';
import MinecraftMap from './gameObjects/MinecraftMap.js';
import SnowMap from './gameObjects/SnowMap.js';
import PiratesMap from './gameObjects/PiratesMap.js';
import GameObject from '../engine/GameObject.js';

export default class MapFactory {
    static create(scene, name) {
        switch (name) {
            case 'MapOne':
                return new PiratesMap(scene);
            case 'MapTwo':
                return new SnowMap(scene);
            case 'MapThree':
                return new MinecraftMap(scene);
            case 'MapFour':
                return new SpaceMap(scene);
        }

        return new GameObject(scene);
    }
}