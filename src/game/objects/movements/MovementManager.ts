import { Brick } from "../Brick";
import { AbstractMovement } from "./AbstractMovement";
import { NaturalMovement } from "./NaturalMovement";
import { SwapMovement } from "./SwapMovement";
import { TweenMovement } from "./TweenMovement";

export class MovementManager {

    protected _movement?: AbstractMovement;
    public get movement() {return this._movement; }

    constructor(
        public readonly brick: Brick
    ) {

    }

    protected add( movement: AbstractMovement ) {

        if ( this.movement ) {
            this.movement.stop();
        }

        this._movement = movement;
        this._movement.start();

    }

    natural( x: number, y: number, rotation: number ) {
        this.add( new NaturalMovement( this, new Phaser.Math.Vector2( x, y ), rotation ) );
    }

    tween( x: number, y: number, rotation: number ) {
        this.add( new TweenMovement( this, new Phaser.Math.Vector2( x, y ), rotation ) );
    }

    swap( x: number, y: number, rotation: number ) {
        this.add( new SwapMovement( this, new Phaser.Math.Vector2( x, y ), rotation ) );
    }

    public stop() {
        if ( this.movement ) {
            this.movement.stop();
        }
    }

    public update() {
        if ( this.movement ) {

            if ( this.movement.isEnded ) {
                this._movement = undefined;
            } else {
                this.movement.update();
            }
        }
    }

    public fall() {
        this.brick.inComposition = false;
        if ( this.movement ) {
            this.movement.stop();
            this._movement = undefined;
        }

        this.brick
            .setStatic( false )
            .setIgnoreGravity( false );
    }

    public atPlace() {
        this.brick.inComposition = true;
        this.brick.setIgnoreGravity( true );
        this.brick.setStatic( true );
    }

    public startDragging() {
        this.brick.inComposition = false;
        this.brick.setStatic( false );
        this.brick.setIgnoreGravity( true );
    }

    public endDragging() {

        this.brick.inComposition = true;

        if ( this.brick.inComposition ) {
            this.brick.setAngularSpeed(0)
                .setAngularVelocity(0)
                .setVelocity(0);
        }
        // this.brick.inComposition = true;
        // this.brick.setIgnoreGravity( true );
        // this.brick.setStatic( true );
        this.atPlace();
    }

}