import { NextUIProvider } from "@nextui-org/react"
import { Controller } from "./Controller"

export const Site: React.FC = props => {
    return <NextUIProvider>
        <Controller />
    </NextUIProvider>
}