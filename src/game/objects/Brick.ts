import { CompositionManager } from "./CompositionManager";
import { MovementManager } from "./movements/MovementManager";
import Phaser from "phaser";

export enum BrickMovements {
    NATURAL = "Natural",
    // JUMP = "Jump",
    SWAP = "Swap"
}

export class Brick extends Phaser.Physics.Matter.Image {


  protected _inComposition = false;
  public get inComposition() {
    return this._inComposition;
  }
  public set inComposition(value: boolean) {
    this._inComposition = value;
  }


  public readonly movement = new MovementManager( this );

  constructor(
    name: string,
    world: Phaser.Physics.Matter.World,
    x: number,
    y: number,
    texture: string,
    frame: number | undefined = undefined,
    options: Phaser.Types.Physics.Matter.MatterBodyConfig = {}
  ) {
    super(world, x, y, texture, frame, { ...options, chamfer: 16 });

    this.name = name;

    this.on(
      Phaser.Input.Events.POINTER_OVER,
      () => {
        this.scene.game.canvas.style.cursor = "pointer";
      }
    );

    this.on(
      Phaser.Input.Events.POINTER_OUT,
      () => {
        this.scene.game.canvas.style.cursor = "default";
      }
    );

    this.on(
      Phaser.Input.Events.POINTER_DOWN,
      (context: Brick) => {

        this.movement.startDragging();
        this.scene.game.canvas.style.cursor = "pointer";

        console.log( this.movement );
    
      },
      this
    );

    this.on(
      Phaser.Input.Events.POINTER_UP,
      (context: Brick) => {
        this.movement.endDragging();
      },
      this
    );

    this.setScale(0.2, 0.2);

  }

  placeOnPosition(
    x: number,
    y: number,
    angle: number
  ): this {
    this.setPosition( x, y );
    this.setAngle( angle );
    return this;
  }

  addedToScene(): void {
    super.addedToScene();

    const rotation = Math.random() * 360;
    this.setRotation(rotation);
    this.setInteractive();
    this.setBounce( 0 );
  }

  fall() {
    this.movement.fall();
  }

  public preUpdate(delta: number, time: number) {
    this.movement.update();
  }

  getStoreData(
    relativeTo: Phaser.Math.Vector2
  ) {

    const positionAbsolute = new Phaser.Math.Vector2(this.x, this.y);

    const positionCenter = positionAbsolute.clone().subtract( relativeTo )

    return {
      position: {
        absolute: positionAbsolute,
        relative: positionCenter
      },
      textureKey: this.texture.key,
      name: this.name,
      angle: this.angle,
      scale: this.scale
    }
  }




}
