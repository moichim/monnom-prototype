import { EventBus, GameEvents } from "../EventBus";
import { BricksGame } from "../scenes/Game";
import { Brick, BrickMovements } from "./Brick";

import { v4 as uuid } from "uuid";

export type CompositionSnapshotType = ReturnType<CompositionManager["getCurrentSceneSnapshot"]>;

export class CompositionManager {

    protected readonly bricks = this.scene.bricks;
    protected dimensions!: ReturnType< CompositionManager["getSceneDimension"]>

    constructor(
        protected readonly scene: BricksGame
    ) {

    }

    protected readonly store: Map<string,CompositionSnapshotType> = new Map();

    public init() {
        this.dimensions = this.getSceneDimension();
    }


    storeCurrentComposition(
        name: string
    ) {

        const bricks = this.bricks.currentlyInComposition;

        if ( bricks.length === 0 ) {
            console.error( "There are no bricks in composition right now!" );
            return;
        }

        const snapshot = this.getCurrentSceneSnapshot();
        snapshot.name = name;

        this.store.set( snapshot.id, snapshot );

        EventBus.emit( GameEvents.COMP_STORED, snapshot );

    }


    protected getCurrentSceneSnapshot() {
        const bricks = this.bricks.currentlyInComposition;

        const stored = bricks.map( brick => {

            return {
                position: this.getPositionRelativeToCenter( brick ),
                rotation: brick.rotation,
                name: brick.name
            }

        } );

        const bounds = stored.reduce( (state, current) => {

            const st = {...state};

            if ( current.position.x < state.minX)
                st.minX = current.position.x;
            if ( current.position.x > state.maxX )
                st.maxX = current.position.x;
            if ( current.position.y < state.minY ) 
                st.minY = current.position.y;
            if ( current.position.y > state.maxY )
                st.maxY = current.position.y;

            return st;

        }, { minX: this.dimensions.width, minY: this.dimensions.height, maxX: 0, maxY: 0 } );

        const dimension = {
            width: bounds.maxX - bounds.minX,
            height: bounds.maxY - bounds.minY
        }

        return {
            bricks: stored,
            bounds,
            dimension,
            id: uuid(),
            name: undefined as unknown as string
        }
    }


    protected getSceneDimension() {
        const width = this.scene.game.canvas.width;
        const height = this.scene.game.canvas.height;
        const diagonal = width + height / 2;

        const center = new Phaser.Math.Vector2(
            width / 2,
            height / 2
        );

        return {
            width,
            height,
            diagonal,
            center
        }
    }

    protected getPositionRelativeToCenter( brick: Brick ): Phaser.Math.Vector2 {

        const current = new Phaser.Math.Vector2( brick.x, brick.y );

        const converted = current.subtract( this.dimensions.center );

        return converted;
    }


    public restoreSnapshot( id: string, mode: BrickMovements ) {

        // Do nothing if snapshot does not exist
        const snapshot = this.store.get( id );
        if ( ! snapshot ) {
            return;
        }

        // All bricks should fall
        this.bricks.all.forEach( brick => brick.fall() );

        // All affected bricks should ho to position
        snapshot.bricks.forEach( brickState => {

            const brick = this.bricks.map.get( brickState.name )
            
            if ( brick ) {

                const newPosition = this.dimensions.center.clone().add( brickState.position );

                if (mode === BrickMovements.NATURAL ) {
                    brick.movement.natural( newPosition.x, newPosition.y, brickState.rotation );
                } else {
                    brick.movement.tween( newPosition.x, newPosition.y, brickState.rotation )
                }

            }

        } );

    }

}