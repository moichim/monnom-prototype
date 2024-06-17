import { Scene } from "phaser";
import { EventBus } from "../EventBus";
import { BrickManager } from "../objects/BrickManager";
import { CompositionManager } from "../objects/CompositionManager";
import { AssetManager } from "../../assets/assetManager";
import Phaser from "phaser";

export class BricksGame extends Scene {
  camera!: Phaser.Cameras.Scene2D.Camera;
  blockTexture!: Phaser.GameObjects.Image;
  gameText!: Phaser.GameObjects.Text;

  bricks = new BrickManager( this );
  compositions = new CompositionManager( this );

  constructor() {
    super("Game");
  }

  preload() {
    AssetManager.registerToScene( this );
    this.compositions.init();
  }

  create() {
    this.matter.world.setBounds();

    // const canDrag = this.matter.world.nextGroup();

    this.addBrick(100, 20);
    this.addBrick(200, 20);
    this.addBrick(300, 20);
    this.addBrick(400, 20);
    this.addBrick(500, 20);
    this.addBrick(600, 20);
    this.addBrick(700, 20);
    this.addBrick(800, 20);
    this.addBrick(50, 100);
    this.addBrick(350, 200);
    this.addBrick(550, 200);
    this.addBrick(750, 200);
    this.addBrick(350, 400);
    this.addBrick(100, 400);
    this.addBrick(200, 400);
    this.addBrick(300, 400);
    this.addBrick(400, 400);
    this.addBrick(500, 400);
    this.addBrick(600, 400);
    this.addBrick(700, 400);
    this.addBrick(800, 400);
    this.addBrick(100, 500);
    this.addBrick(200, 500);
    this.addBrick(300, 500);
    this.addBrick(400, 500);
    this.addBrick(500, 500);
    this.addBrick(600, 500);
    this.addBrick(700, 500);
    this.addBrick(800, 500);
    this.addBrick(100, 800);
    this.addBrick(200, 800);
    this.addBrick(300, 800);
    this.addBrick(400, 800);
    this.addBrick(500, 800);
    this.addBrick(600, 800);
    this.addBrick(700, 800);
    this.addBrick(800, 800);

    // const rebrick = this.matter.add.gameObject( brick );

    this.matter.add.mouseSpring({
      length: 1,
      stiffness: 0.1,
      // collisionFilter: {
      // group: canDrag
      // }
    });

    EventBus.emit("current-scene-ready", this);
  }


  addBrick( x: number, y: number ) {
    this.bricks.add( `brick-${x}-${y}`,x,y );
  }

  fall() {
    this.bricks.all.forEach((brick) => brick.fall());
  }

  changeScene() {
    this.scene.start("GameOver");
  }


}
