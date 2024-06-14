import { useCallback, useEffect, useRef, useState } from "react";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";
import { MainMenu } from "./game/scenes/MainMenu";
import { BricksGame } from "./game/scenes/Game";
import { CompositionSnapshotType } from "./game/objects/CompositionManager";
import { EventBus, GameEvents } from "./game/EventBus";
import { Brick, BrickMovements } from "./game/objects/Brick";

function App() {
  const [movement, setMovement] = useState<BrickMovements>(
    BrickMovements.NATURAL
  );

  // The sprite can only be moved in the MainMenu Scene
  const [canMoveSprite, setCanMoveSprite] = useState(true);

  //  References to the PhaserGame component (game and scene are exposed)
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

  // Stored compositions aray
  const [compositions, setCompositions] = useState<CompositionSnapshotType[]>(
    []
  );

  // Mirror stored compositions to local state
  useEffect(() => {
    EventBus.on(
      GameEvents.COMP_STORED,
      (composition: CompositionSnapshotType) => {
        setCompositions([...compositions, composition]);
      }
    );

    return () => {
      EventBus.removeListener(GameEvents.COMP_STORED);
    };
  }, [compositions, setCompositions]);

  const fall = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as BricksGame;

      if (scene) {
        scene.fall();
      }
    }
  };

  const store = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as BricksGame;

      if (scene) {
        scene.compositions.storeCurrentComposition("Něco tady je");
      }
    }
  };

  const restore = (composition: CompositionSnapshotType) => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as BricksGame;

      if (scene) {
        // scene.restoreComposition();

        scene.compositions.restoreSnapshot(composition.id, movement);

        console.log("Restoruji kompozici");
      }
    }
  };

  // Event emitted from the PhaserGame component
  const currentScene = (scene: Phaser.Scene) => {
    setCanMoveSprite(scene.scene.key !== "MainMenu");
  };

  return (
    <div id="app">
      <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />

      <div>Movement mode: {movement}</div>

        <select value={movement} onChange={(event) => {
            setMovement( event.target.value as BrickMovements );
        }}>
            {Object.values(BrickMovements).map( mode => <option key={mode} value={mode}>{mode}</option> )}
        </select>

      <div>
        <div>
          <button className="button" onClick={fall}>
            Fall
          </button>
        </div>

        <div>
          <button className="button" onClick={store}>
            Store
          </button>
        </div>

        {compositions.map((composition) => (
          <button key={composition.id} onClick={() => restore(composition)}>
            {composition.id}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
