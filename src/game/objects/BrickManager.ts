import { BricksGame } from "../scenes/Game";
import { Brick } from "./Brick";
import Phaser from "phaser";

export class BrickManager {
  protected array: Brick[] = [];
  public readonly map: Map<string, Brick> = new Map();

  constructor(protected readonly scene: BricksGame) {}


  /** Add a new brick if not exists yet */
  public add(name: string, x: number, y: number): Brick | undefined {
    if (!this.map.has(name)) {
      const brick = this.scene.add.existing(
        new Brick(name, this.scene.matter.world, x, y, "block")
      );

      this.array.push(brick);
      this.map.set(name, brick);

      return brick;
    }
    console.error(`Brick '${name}' already exists.`);

    return undefined;
  }


  /** Remove an existing brick */
  public remove( brick: string|Brick ) {

    const name = typeof brick === "string"
        ? brick
        : brick.name;

    this.map.delete( name );
    this.array = this.array.filter( item => item.name !== name );

  }

  public get( name: string ): Brick|undefined {
    return this.map.get( name );
  }

  /** Get array of all bricks that are currently in a composition */
  public get currentlyInComposition(): Brick[] {
    return this.array.filter( brick => brick.inComposition );
  }

  /** Get array of all bricks */
  public get all() {return this.array;}

}
