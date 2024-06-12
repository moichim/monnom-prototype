import { useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';
import { MainMenu } from './game/scenes/MainMenu';
import { BricksGame } from './game/scenes/Game';

function App()
{
    // The sprite can only be moved in the MainMenu Scene
    const [canMoveSprite, setCanMoveSprite] = useState(true);

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

    const fall = () => {
        if ( phaserRef.current ) {
            const scene = phaserRef.current.scene as BricksGame;

            if ( scene ) {
                scene.fall();
            }
        }
    }

    const store = () => {
        if ( phaserRef.current ) {
            const scene = phaserRef.current.scene as BricksGame;

            if ( scene ) {
                scene.storeComposition();
            }
        }
    }

    const restore = () => {
        if ( phaserRef.current ) {
            const scene = phaserRef.current.scene as BricksGame;

            if ( scene ) {
                scene.restoreComposition();
            }
        }
    }

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {

        setCanMoveSprite(scene.scene.key !== 'MainMenu');
        
    }

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            <div>
                <div>
                    <button className="button" onClick={fall}>Fall</button>
                </div>

                <div>
                    <button className="button" onClick={store}>Store</button>
                </div>
                
                <div>
                    <button className="button" onClick={restore}>Restore</button>
                </div>
            </div>
        </div>
    )
}

export default App