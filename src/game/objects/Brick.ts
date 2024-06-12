export class Brick extends Phaser.Physics.Matter.Image {
  protected _inComposition = false;
  public get inComposition() {
    return this._inComposition;
  }
  protected set inComposition(value: boolean) {
    this._inComposition = value;

  }

  public addToComposition() {
    this.inComposition = true;

    this.setIgnoreGravity(true);
  }

  public placeInsideComposition() {
    this.inComposition = true;
    this.setStatic(true)
        .stopMovement();
  }

  public removeFromComposition() {
    this.inComposition = false;

    this.setIgnoreGravity(false).setStatic(false);
  }

  public startMovingInsideComposition() {
    this.setStatic(false);
  }

  public stopMovingInsideComposition() {
    this.setStatic(true).stopMovement();
  }

  public stopMovement() {
    return this.setAngularSpeed(0).setAngularVelocity(0).setVelocity(0, 0);
  }

  constructor(
    world: Phaser.Physics.Matter.World,
    x: number,
    y: number,
    texture: string,
    frame: number | undefined = undefined,
    options: Phaser.Types.Physics.Matter.MatterBodyConfig = {}
  ) {
    super(world, x, y, texture, frame, { ...options, chamfer: 16 });

    this.on(
      Phaser.Input.Events.POINTER_DOWN,
      (context: Brick) => {
        // this.stopRestoringPosition();

        if (this.inComposition) {
          this.startMovingInsideComposition();
        } else {
          this.addToComposition();
        }
      },
      this
    );

    this.on(
      Phaser.Input.Events.POINTER_UP,
      (context: Brick) => {
        if (this.inComposition) {
          this.stopMovingInsideComposition();
        } else {
          this.placeInsideComposition();
        }
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
    this.removeFromComposition();
    this.stopRestoringPosition();
  }

  protected targetPosition?: Phaser.Math.Vector2;
  protected targetRotation?: number;

  restorePosition(x: number, y: number, rotation: number) {
    this.targetPosition = new Phaser.Math.Vector2(x, y);
    this.targetRotation = rotation;
  }

  stopRestoringPosition() {
    this.targetPosition = undefined;
    this.targetRotation = undefined;
  }

  public preUpdate(delta: number, time: number) {
    if (this.targetPosition !== undefined || this.targetRotation !== undefined) {

      // Update movement towards target location
      if (this.targetPosition) {
        const currentPosition = this.getCenter();

        const direction = this.targetPosition
          .clone()
          .subtract(currentPosition)
          .normalize();

        const distance = this.targetPosition.distance(currentPosition);

        const diagonal =
          (this.scene.game.canvas.width + this.scene.game.canvas.height) / 2;

        const speed = (distance / diagonal) * 100;

        if (distance > 3) {
          this.setVelocity(direction.x * speed, direction.y * speed);
        } else {
          this.targetPosition = undefined;
          this.placeInsideComposition();
        }
      }

      if (this.targetRotation !== undefined) {
        const angleDelta = this.targetRotation - this.rotation;

        if (Math.abs(angleDelta) > 0.1) {
          const aspect = angleDelta > 1 ? 0.1 : angleDelta > 0.5 ? 0.05 : 0.01;

          this.setAngularVelocity(angleDelta * aspect);
        } else {
          this.targetRotation = undefined;
        }
      }

    }
  }
}
