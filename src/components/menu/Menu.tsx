import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { BrickMovements } from "../../game/objects/Brick";
import { useState } from "react";

type MenuProps = React.PropsWithChildren & {
  actionButtons?: React.ReactNode
};

export const Menu: React.FC<MenuProps> = (props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className={"fixed right-3 top-3"}>
      <div
        // isIconOnly
       //  variant="bordered"
        // color="primary"
      >
        {props.children}
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement={"bottom-center"}
      >
        <ModalContent>
        <ModalHeader>Nastavení</ModalHeader>
        <ModalBody>{props.children}</ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
