import { useEffect, useMemo, useRef, useState } from "react";
import { BrickMovements } from "../game/objects/Brick";
import { MovementRadio } from "./movement/movementRadio";
import { Menu } from "./menu/Menu";
import { IRefPhaserGame, PhaserGame } from "../game/PhaserGame";
import { BricksGame } from "../game/scenes/Game";
import { CompositionSnapshotType } from "../game/objects/CompositionManager";
import { Button } from "@nextui-org/react";
import { CompositionPopover } from "./state/CompositionsPopover";
import { EventBus, GameEvents } from "../game/EventBus";

export const Controller: React.FC = () => {
  const [movement, setMovement] = useState<BrickMovements>(
    BrickMovements.NATURAL
  );

  // Reference to the Phaser instance
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  // Reference to the scene
  const [scene, setScene] = useState<BricksGame | undefined>();

  // Stored compositions array
  const [compositions, setCompositions] = useState<CompositionSnapshotType[]>(
    []
  );

  // Store the scene when ready
  useEffect(() => {
    EventBus.on("current-scene-ready", (scene_instance: Phaser.Scene) => {
      console.log("přišla scéna!", scene_instance);
      setScene(scene_instance as BricksGame);
    });

    return () => {
      EventBus.removeListener("current-scene-ready");
    };
  }, [phaserRef, setScene]);

  
  // Store the composition when ready
  useEffect(() => {
    EventBus.on(
      GameEvents.COMP_STORED,
      (composition: CompositionSnapshotType) => {
        console.log(composition);
        setCompositions([...compositions, composition]);
      }
    );

    return () => {
      EventBus.removeListener(GameEvents.COMP_STORED);
    };
  }, [compositions, setCompositions]);

  const restore = (composition: CompositionSnapshotType) => {
    console.log(scene);
    if (scene) {
      scene.compositions.restoreSnapshot(composition, movement);
    }
  };

  const fall = () => {
    console.log(scene);
    if (scene) {
      scene.fall();
    }
  };

  const store = () => {
    console.log(scene);
    if (scene) {
      scene.compositions.storeCurrentComposition("Some ID");
    }
  };

  return (
    <div className="inset-0 w-screen h-screen overflow-hidden">

<PhaserGame ref={phaserRef} />

      <Menu
        actionButtons={
          <>
            <Button className="bg-gray-300" onClick={store}>
              Store
            </Button>
            <Button className="bg-gray-300" onClick={fall}>
              Fall
            </Button>
            <Button className="bg-gray-300">Shuffle</Button>
          </>
        }
      >
        <MovementRadio
          value={movement}
          onChange={(event) => {
            setMovement(event.target.value as BrickMovements);
          }}
        />
      </Menu>

      <CompositionPopover compositions={compositions} restore={restore} />
    
    </div>
  );
};
