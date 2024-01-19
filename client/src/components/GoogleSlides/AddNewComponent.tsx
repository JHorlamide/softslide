import React from 'react'
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button as ChakraButton
} from '@chakra-ui/react'
import { IoIosArrowDown } from "react-icons/io";
import { MdInsertChartOutlined } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";

interface AddNewComponentProps {
  handleAddMetric: () => void;
  handleAddText: () => void;
  handleAddImage: () => void;
}


const AddNewComponent: React.FC<AddNewComponentProps> = ({
  handleAddImage,
  handleAddMetric,
  handleAddText
}) => {
  return (
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
          <MenuItem
            icon={<MdInsertChartOutlined color="black" size={20} />}
            onClick={handleAddMetric}
          >
            Metric
          </MenuItem>

          <MenuItem
            icon={<IoDocumentTextOutline color="black" size={20} />}
            onClick={handleAddText}
          >
            Text
          </MenuItem>

          <MenuItem
            icon={<CiImageOn color="black" size={20} />}
            onClick={handleAddImage}
          >
            Image
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default AddNewComponent