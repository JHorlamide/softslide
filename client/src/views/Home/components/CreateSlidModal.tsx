import { useState } from "react";
import Button from "../../../components/CustomBtn/Button";
import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
  FormControl,
  FormLabel
} from "@chakra-ui/react"

interface CreateSlidModalProps {
  loading: boolean;
  isOpen: boolean,
  onClose: () => void;
  handleCreate: (title: string) => void;
}

const CreateSlidModal = ({
  loading,
  isOpen,
  onClose,
  handleCreate
}: CreateSlidModalProps) => {
  const [title, setTitle] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setTitle(value);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent bg="white" color="black">
        <ModalHeader fontSize="18px">
          <Flex justifyContent="flex-end">
            <Button
              bg="white"
              border="1px"
              onClick={onClose}
              _hover={{ bg: "white" }}
            >
              Close
            </Button>
          </Flex>
        </ModalHeader>

        <ModalBody display="flex" gap={3} justifyContent="center">
          <FormControl>
            <FormLabel>Enter slide title</FormLabel>

            <Input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter display="flex" justifyContent="space-between" color="white">
          <Button
            ml={3}
            isLoading={loading}
            bg="blackAlpha.800"
            _hover={{ bg: "blackAlpha.800" }}
            onClick={() => handleCreate(title)}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateSlidModal