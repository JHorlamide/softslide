import React, { Fragment } from 'react'
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button as ChakraButton,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  Input,
  Flex,
} from '@chakra-ui/react'
import { IoIosArrowDown } from "react-icons/io";
import { MdInsertChartOutlined } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CiImageOn, CiSearch } from "react-icons/ci";
import { BsBoxes } from "react-icons/bs";
import { FaHashtag } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa";

import Button from "../CustomBtn/Button";

interface AddNewComponentProps {
  handleAddText: () => void;
  handleAddImage: () => void;
  handleAddChart: () => void;
}

interface MetricOptionProps {
  isOpen: boolean;
  onClose: () => void;
  handleAddChart: () => void;
}

const MetricOption: React.FC<MetricOptionProps> = ({ isOpen, onClose, handleAddChart }) => {
  const menuList = [
    {
      id: 1,
      title: "Bookings",
      Icon: BsBoxes,
      onClick: () => {
        console.log("Booking");
        onClose();
      }
    },
    {
      id: 2,
      title: "Company wide KPIs",
      Icon: BsBoxes,
      onClick: () => {
        console.log("Company wide KIPs");
        onClose();
      }
    },
    {
      id: 3,
      title: "Revenue",
      Icon: FaHashtag,
      onClick: () => {
        handleAddChart();
        onClose();
      },
    },
    {
      id: 4,
      title: "Sales Reps Performance",
      Icon: CiImageOn,
      onClick: () => {
        console.log("Sales Reps Performance");
        onClose();
      }
    },
    {
      id: 5,
      title: "Head Count",
      Icon: FaChartPie,
      onClick: () => {
        console.log("Head Count");
        onClose();
      }
    },
    {
      id: 6,
      title: "Performance",
      Icon: MdInsertChartOutlined,
      onClick: () => {
        console.log("Performance");
        onClose();
      }
    }
  ];

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent
          px={3}
          py={3}
          top={0}
          right={170}
          position="absolute"
          bg="blue.800"
        >
          <Flex gap={4}>
            <InputGroup>
              <InputLeftElement>
                <CiSearch />
              </InputLeftElement>

              <Input
                color="white"
                type="text"
                borderColor="white"
                placeholder="Search Metric Library"
                _focus={{ borderColor: "white" }}
              />
            </InputGroup>

            <Button>New</Button>
          </Flex>

          <ModalBody px={0} mt={2}>
            <Flex gap={2} flexDirection="column" width="full">
              {menuList.map(({ id, title, Icon, onClick }) => (
                <Button
                  key={id}
                  justifyContent="flex-start"
                  width="full"
                  color="white"
                  bg="blue.800"
                  leftIcon={<Icon color="white" />}
                  _hover={{ bg: "blue.700" }}
                  onClick={onClick}
                >
                  {title}
                </Button>
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

const AddNewComponent: React.FC<AddNewComponentProps> = ({
  handleAddImage,
  handleAddText,
  handleAddChart
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const menuList = [
    {
      id: 1,
      title: "Metric",
      Icon: MdInsertChartOutlined,
      onClick: onOpen
    },

    {
      id: 2,
      title: "Text",
      Icon: IoDocumentTextOutline,
      onClick: handleAddText,
    },

    {
      id: 3,
      title: "Image",
      Icon: CiImageOn,
      onClick: handleAddImage,
    },
  ]

  return (
    <Fragment>
      <MetricOption
        isOpen={isOpen}
        onClose={onClose}
        handleAddChart={handleAddChart}
      />

      <Box position="absolute" top={3} right={466}>
        <Menu>
          <MenuButton
            color="black"
            bg="white"
            width="auto"
            type="submit"
            border="1px"
            borderColor="blackAlpha.500"
            _hover={{ bg: "white.200" }}
            as={ChakraButton}
            rightIcon={<IoIosArrowDown />}
          >
            New Content
          </MenuButton>

          <MenuList>
            {menuList.map(({ id, title, Icon, onClick }) => (
              <MenuItem
                key={id}
                icon={<Icon color="black" size={20} />}
                onClick={onClick}
              >
                {title}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
    </Fragment>
  )
}

export default AddNewComponent