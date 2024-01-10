import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'
import Button from '../CustomBtn/Button'

interface DynamicContentModalProps {
  isOpen: boolean,
  onClose: () => void;
}

const DynamicContentModal: React.FC<DynamicContentModalProps> = ({ isOpen, onClose }) => {
  const handleCommentarySelect = () => {
    console.log("commentary");
    onClose();
  }

  const handleMetricSelect = () => {
    console.log("Metric");
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent bg="white" color="black">
        <ModalHeader fontSize="18px">
          <Flex justifyContent="space-between">
            <Text>Add Dynamic Content</Text>
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
          <Button
            color="white"
            bg="gray"
            width="full"
            _hover={{ bg: "gray" }}
            onClick={handleMetricSelect}
          >
            Metric
          </Button>

          <Button
            color="white"
            bg="gray"
            width="full"
            _hover={{ bg: "gray" }}
            onClick={handleCommentarySelect}
          >
            Commentary
          </Button>
        </ModalBody>

        <ModalFooter display="flex" justifyContent="space-between" color="white">
          <Button
            bg="white"
            color="black"
            border="1px"
            onClick={onClose}
            _hover={{ bg: "white" }}
          >
            Need Help?
          </Button>

          <Button
            ml={3}
            bg="blackAlpha.800"
            _hover={{ bg: "blackAlpha.800" }}
            onClick={() => console.log("Commentary")}
          >
            Add Content
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DynamicContentModal;