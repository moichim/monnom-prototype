import { useMemo } from "react";
import { Brick } from "../game/objects/Brick";
import { AssetManager } from "../assets/assetManager";

export type SceneStateBrickProps = ReturnType<Brick["getStoreData"]>;

export const SceneStateBrick: React.FC<SceneStateBrickProps> = (props) => {
  const url = useMemo(
    () => AssetManager.getUrl(props.textureKey),
    [props.textureKey]
  );

  return (
    <g
        transform={` translate( ${props.position.absolute.x} ${props.position.absolute.y} ) `}
        // x={props.position.absolute.x}
        // y={props.position.absolute.y}
        style={{
            transformOrigin: "center center"
        }}
    >
      <image
        href={url}
        // x={props.position.absolute.x}
        // y={props.position.absolute.y}
        transform={` 
        scale( ${props.scale} ${props.scale} ) 
        rotate( ${props.angle} ${props.position.absolute.x / 2} ${
          props.position.absolute.y / 2
        } ) `}
        style={
          {
            // transformOrigin: "center center"
          }
        }
      />
    </g>
  );
};
