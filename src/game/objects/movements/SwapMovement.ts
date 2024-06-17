import { AbstractMovement } from "./AbstractMovement";
import Phaser from "phaser";

export class SwapMovement extends AbstractMovement {

    protected onStart(): void {

      console.log( this );

      // this.brick.setIgnoreGravity( true );
      // this.brick.setCollidesWith( 99 )
      // this.brick.alpha

      const chain = this.brick.scene.tweens.chain({
        targets: this.brick,
        tweens: [
          {
            delay: Math.random() * 500 ,
            alpha: 0,
            duration: 200,
         //    repeat: 0,
            onComplete: () => {
              this.brick.x = this.targetPosition.x + ( ( Math.random() * 50 ) - 25 );
              this.brick.y = this.targetPosition.y + ( ( Math.random() * 50 ) - 25 );
              this.brick.angle = this.targetRotation;
              // this.brick.setScale( 1.2, 1.2 );
              this.brick.movement.atPlace();
            }
          },
          {
            alpha: 1,
            duration: 200,
            x: this.targetPosition.x,
            y: this.targetPosition.y,
            // scale: {x:1,y:1},
            // repeat: 0,
            onComplete: () => {
              this.isAtPosition = true;
              this.isAtRotation = true;
            }
          }
        ]
      });

      chain.play();
        
    }

    protected onStop(): void {
        
    }

    protected onEnd(): void {
        console.log( "skončil jsem" );
        this.movement.atPlace();
    }

    protected onUpdate(): void {

    }

}