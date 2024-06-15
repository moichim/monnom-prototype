import { MovementManager } from "./movements/MovementManager";

export enum BrickMovements {
    NATURAL = "Natural",
    JUMP = "Jump",
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
      Phaser.Input.Events.POINTER_DOWN,
      (context: Brick) => {

        this.movement.startDragging();
    
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
  }

  addedToScene(): void {
    super.addedToScene();

    this.setScale(0.2, 0.2);

    const rotation = Math.random() * 360;
    this.setRotation(rotation);
    this.setInteractive();
    this.setBounce( 0 );

    this.world.on(
      Phaser.Input.Events.UPDATE,
      (event: Brick) => {
        console.log(event);
      },
      this
    );
  }

  fall() {
    this.movement.fall();
  }

  public preUpdate(delta: number, time: number) {
    this.movement.update();
  }

  getStoreData() {
    return this.toJSON()
  }




}
