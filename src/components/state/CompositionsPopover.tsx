import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollShadow,
} from "@nextui-org/react";
import React from "react";
import { CompositionSnapshotType } from "../../game/objects/CompositionManager";
import { SceneState } from "./SceneState";

type CompositionPopoverProps = {
  compositions: CompositionSnapshotType[];
  restore: (composition: CompositionSnapshotType) => void;
};

export const CompositionPopover: React.FC<CompositionPopoverProps> = (
  props
) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="fixed top-3 left-3">
      <Popover
        color="foreground"
        isOpen={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
        }}
      >
        <PopoverTrigger>
          <Button variant="bordered" className="bg-white" color="primary">
            Kompozice
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <ScrollShadow orientation={"horizontal"} className="max-w-screen-sm">
            <div className="flex gap-2">
              {props.compositions.map((composition) => (
                <SceneState
                  key={composition.id}
                  onClick={() => {
                    // setIsOpen(false);
                    props.restore(composition);
                  }}
                  snapshot={composition}
                ></SceneState>
              ))}
            </div>
          </ScrollShadow>
        </PopoverContent>
      </Popover>
    </div>
  );
};
