import Character from "./Character.js";

export default class CharacterAi extends Character {
    attackRadius = 6;
    defenseRadius = 15;

    preferedAttack;
    changePreferedAttackTimer = 0;
    
    targetPlayer;
    lastTargetDirection = 0;
    targetDirection;
    
    aiMove = false;
    aiAttack = false;
    aiBlock = false;

    random;

    static MoveCooldownValue = 0.5;
    static ActionCooldownValue = 0.5;
    moveCooldown = 1.5;
    actionCooldown = 0;

    constructor(scene, props = {}) {
        super(scene, props);
    }

    updateTargetPlayer() {
        let target = null;
        let maxHp = -1;
        let nearestDistance = -1;
        for (const player of Character.totalPlayers) {
            if (player.playerIndex != this.playerIndex && !player.isDeath) {
                const playerPosition = player.getNative().position;
                const distance = this.handler.position.distanceToSquared(playerPosition);
                const condition = (nearestDistance == -1 || nearestDistance > distance) && (maxHp == -1 || maxHp < player.hp);
                if (condition) {
                    nearestDistance = distance;
                    maxHp = player.hp;
                    target = player;
                }
            }
        }
        this.targetPlayer = target;
    }

    updatePreferedAttack(dt) {
        if (this.changePreferedAttackTimer <= 0) {
            const attacks = ['punch', 'kick'];
            const randomIndex = THREE.Math.randInt(0, attacks.length - 1);
            this.preferedAttack = attacks[randomIndex];
            this.changePreferedAttackTimer = 3;
        }

        this.changePreferedAttackTimer -= dt;
        this.changePreferedAttackTimer = Math.max(this.changePreferedAttackTimer, 0);
    }

    updateAiState() {
        this.random = THREE.Math.randFloat(0, 1);

        this.updateTargetPlayer();

        if (!this.targetPlayer) {
            this.aiMove = false;
            this.aiAttack = false;
            return;
        }

        const currentPosition = this.handler.position;
        const targetPosition = new THREE.Vector3();
        targetPosition.copy(this.targetPlayer.getNative().position);
        
        const targetDirectionVector = new THREE.Vector3();
        targetDirectionVector.subVectors(targetPosition, currentPosition);

        let targetDirection = targetDirectionVector.x;
        targetDirection /= Math.abs(targetDirection);
        this.targetDirection = targetDirection;

        // If it is the first time
        this.lastTargetDirection = this.lastTargetDirection > 0 ? this.lastTargetDirection : targetDirection;
        
        // Add a cooldown when the target player direction changes
        if (this.lastTargetDirection != targetDirection) {
            this.moveCooldown = CharacterAi.MoveCooldownValue;
        }

        this.lastTargetDirection = targetDirection;

        const distanceSquaredToTarget = currentPosition.distanceToSquared(targetPosition);

        if (distanceSquaredToTarget >= this.attackRadius * this.attackRadius) {
            this.aiMove = true;
            this.aiAttack = false;
            this.aiBlock = false;
            this.actionCooldown = 0;
        }
        else {
            this.aiMove = false;
            this.computeAiAction();
        }
    }

    computeAiAction() {
        if (this.actionCooldown <= 0) {
            this.aiAttack = false;
            this.aiBlock = false;

            if (this.targetPlayer.isAttack) {
                this.aiAttack = false;
                this.aiBlock = false;
                
                if (this.random < 0.6) {
                    this.aiBlock = true;
                }
                else if (this.random >= 0.6 && this.random < 0.95) {
                    this.aiAttack = true;
                }

                this.actionCooldown = THREE.Math.randFloat(CharacterAi.ActionCooldownValue, CharacterAi.ActionCooldownValue + 0.25);
                return;
            }
            
            if (this.random < 0.6) {
                this.aiAttack = true;
            }
            else if (this.random >= 0.6 && this.random < 0.95) {
                this.aiBlock = true;
            }
            this.actionCooldown = THREE.Math.randFloat(CharacterAi.ActionCooldownValue, CharacterAi.ActionCooldownValue + 0.25);
        }
    }

    resetCharacterState() {
        super.resetCharacterState();
    }

    interact() {
        return false;
    }

    onKeyDown(key) {}

    onKeyUp(key) {}

    controlCharacter(dt) {
        let canAttack = !(this.isHit || this.isBlock) && this.onGround;
        let canBlock = !this.isHit && this.onGround;
        this.resetCharacterState();

        this.updatePreferedAttack(dt);
        this.updateAiState();

        if (canAttack) {
            if (this.aiAttack) {
                if (this.preferedAttack === 'punch') {
                    this.punch();
                }
                else if (this.preferedAttack === 'kick') {
                    this.kick();
                }
            }
        }

        if (canBlock && this.aiBlock) {
            this.block();
        }

        if (this.canMove) {
            if (this.aiMove && this.moveCooldown <= 0) {
                this.move(dt, this.targetDirection);
            }
        }

        if (!this.onGround) {
            this.currentState = Character.State.Jump;
        }

        this.moveCooldown -= dt;
        this.moveCooldown = Math.max(this.moveCooldown, 0);

        this.actionCooldown -= dt;
        this.actionCooldown = Math.max(this.actionCooldown, 0);
    }
}