import WebServiceConnector from "../WebServiceConnector.js";
import Character from "./Character.js";

export default class GameManager {
    static gameOver = false;

    static onUpdate(dt) {
        const playerCount = Character.totalPlayers.length;

        let deathPlayers = 0;
        for (const player of Character.totalPlayers) {
            if (player.isDeath) {
                deathPlayers += 1;
            }
        }

        if (deathPlayers == playerCount - 1) {
            if (!GameManager.gameOver) {
                let winner = null;
                for (const player of Character.totalPlayers) {
                    if (!player.isDeath) {
                        winner = player;
                    }
                }
                GameManager.onGameOver(winner);
                GameManager.gameOver = true;
            }
        }
    }

    static onGameOver(winnerPlayer) {
        WebServiceConnector.onWin(winnerPlayer.userId ?? null);
    }
}