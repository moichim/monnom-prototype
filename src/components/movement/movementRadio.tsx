import { Radio, RadioGroup } from "@nextui-org/react"
import { BrickMovements } from "../../game/objects/Brick"

type MovementRadioProps = {
    onChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void,
    value: string
}

export const MovementRadio: React.FC<MovementRadioProps> = props => {


    return <RadioGroup 
        label="Movement type"
        onChange={(event) => {

            props.onChange( event ) }
        }
        value={props.value}
        orientation="horizontal"
    >
        {Object.entries( BrickMovements ).map( ([key,label]) => {

            return <Radio key={key} value={label} >{label}</Radio>

        } )}
    </RadioGroup>
}