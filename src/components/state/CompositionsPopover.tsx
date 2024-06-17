import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollShadow,
} from "@nextui-org/react";
import React, { useMemo } from "react";
import { CompositionSnapshotType } from "../../game/objects/CompositionManager";
import { SceneState } from "./SceneState";
import { useWindowSize } from "usehooks-ts";

type CompositionPopoverProps = {
  compositions: CompositionSnapshotType[];
  restore: (composition: CompositionSnapshotType) => void;
};

export const CompositionPopover: React.FC<CompositionPopoverProps> = (
  props
) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { width = 0, height = 0 } = useWindowSize();

  const filtered = useMemo( () => {

    console.log( width, height );

    return props.compositions.filter( composition => {
      console.log( composition.dimension.composition );
      return composition.dimension.composition.width < ( width - 100 )
        && composition.dimension.composition.height < ( height - 200 )
        // && composition.dimension.composition.width > ( width - 200 )
        // && composition.dimension.composition.height > ( height - 200 )
    } )

  }, [width, height, props.compositions] );


  return (
    <>
      {filtered.length > 0 && 
        <Popover
        color="foreground"
        isOpen={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
        }}
      >
        <PopoverTrigger>
          <Button color="primary" variant="solid">
            Compositions
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <ScrollShadow orientation={"horizontal"} className="max-w-screen-sm">
            <div className="flex flex-col gap-2">
              {filtered.map((composition) => (
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
      
      }
      </>
  );
};
