import Character from "./Character.js";
import SimpleRigidBody from "./SimpleRigidBody.js";

export default class Item extends SimpleRigidBody {
    
    static Type = {
        None: 0,
        Defense: 1,
        Attack: 2
    };

    interactionRadius = 2;

    constructor(scene) {
        super(scene);
    }

    getActionCharacterState() {
        return Character.State.Idle;
    }
    
    getType() {
        return Item.Type.None;
    }
    
    getNearestPlayerIndex() {
        let nearestIndex = 0;
        let nearestDistance = -1;
        for (const player of Character.totalPlayers) {
            const playerPosition = player.getNative().position;
            const distance = this.handler.position.distanceToSquared(playerPosition);
            if (nearestDistance == -1 || nearestDistance > distance) {
                nearestDistance = distance;
                nearestIndex = player.playerIndex;
            }
        }
        
        return nearestIndex;
    }
    
    onInteraction(triggerObject) {}

    onUse(triggerObject, beginUse = true) {
        return this.getActionCharacterState();
    }

    checkForInteraction() {
        for (const player of Character.totalPlayers) {
            const playerPosition = player.getNative().position;
            const distance = this.handler.position.distanceToSquared(playerPosition);
            if (distance <= (this.interactionRadius * this.interactionRadius) && player.interact()) {
                // console.log('Player ' + player.playerIndex + ' can interact');
                this.onInteraction(player);
                break;
            }
        }
    }
}