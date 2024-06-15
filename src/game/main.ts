import { AUTO, Game } from "phaser";
import { BricksGame as MainGame } from "./scenes/Game";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 1024,
  height: 900,
  parent: "game-container",
  backgroundColor: "#028af8",
  physics: {
    default: "matter",
    matter: {
      debug: true,
    },
  },
  scene: [MainGame],
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
